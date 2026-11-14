import { vi } from 'vitest'
import { httpClient, TOKEN_STORAGE_KEY } from './httpClient'

// Respuesta falsa de fetch
function respuesta({ ok = true, status = 200, json } = {}) {
  return {
    ok,
    status,
    json: json ? () => Promise.resolve(json) : () => Promise.reject(new Error('sin cuerpo')),
  }
}

describe('httpClient', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('devuelve el JSON cuando la respuesta es exitosa', async () => {
    fetch.mockResolvedValue(respuesta({ json: { id: 1, nombre: 'CESDE' } }))

    const datos = await httpClient.get('/api/test')

    expect(datos).toEqual({ id: 1, nombre: 'CESDE' })
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/test'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('envía el body como JSON en un POST', async () => {
    fetch.mockResolvedValue(respuesta({ json: { ok: true } }))

    await httpClient.post('/api/test', { email: 'ana@empresa.com' })

    const [, config] = fetch.mock.calls[0]
    expect(config.method).toBe('POST')
    expect(config.body).toBe(JSON.stringify({ email: 'ana@empresa.com' }))
  })

  it('agrega el header Authorization cuando hay token guardado', async () => {
    localStorage.setItem(TOKEN_STORAGE_KEY, 'mi-token')
    fetch.mockResolvedValue(respuesta({ json: {} }))

    await httpClient.get('/api/test')

    const [, config] = fetch.mock.calls[0]
    expect(config.headers.Authorization).toBe('Bearer mi-token')
  })

  it('no envía Authorization si no hay token', async () => {
    fetch.mockResolvedValue(respuesta({ json: {} }))

    await httpClient.get('/api/test')

    const [, config] = fetch.mock.calls[0]
    expect(config.headers.Authorization).toBeUndefined()
  })

  it('devuelve null en una respuesta 204 (sin contenido)', async () => {
    fetch.mockResolvedValue(respuesta({ status: 204 }))

    await expect(httpClient.delete('/api/test/1')).resolves.toBeNull()
  })

  describe('manejo de errores del backend', () => {
    it('usa el campo "message" del backend', async () => {
      fetch.mockResolvedValue(
        respuesta({ ok: false, status: 400, json: { message: 'Correo ya registrado' } })
      )

      await expect(httpClient.post('/api/test', {})).rejects.toThrow('Correo ya registrado')
    })

    it('une los mensajes de validationErrors cuando es un objeto', async () => {
      fetch.mockResolvedValue(
        respuesta({
          ok: false,
          status: 400,
          json: { validationErrors: { password: 'Contraseña muy corta.', email: 'Correo inválido.' } },
        })
      )

      await expect(httpClient.post('/api/test', {})).rejects.toThrow(
        'Contraseña muy corta. Correo inválido.'
      )
    })

    it('lee los mensajes cuando "errors" es un arreglo', async () => {
      fetch.mockResolvedValue(
        respuesta({
          ok: false,
          status: 400,
          json: { errors: [{ defaultMessage: 'Nombre requerido' }, 'Rol requerido'] },
        })
      )

      await expect(httpClient.post('/api/test', {})).rejects.toThrow('Nombre requerido Rol requerido')
    })

    it('usa un mensaje genérico con el status cuando el cuerpo no es JSON', async () => {
      fetch.mockResolvedValue(respuesta({ ok: false, status: 500 }))

      await expect(httpClient.get('/api/test')).rejects.toThrow('Error en la petición HTTP (500)')
    })
  })
})