import { renderHook, act, waitFor, render } from '@testing-library/react'
import { vi } from 'vitest'
import { AuthProvider, AuthContext } from './AuthContext'
import { useContext } from 'react'
import { authService } from '@/features/auth/auth.service'
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@/core/httpClient'

// Mockeamos el servicio de login para no hacer peticiones reales
vi.mock('@/features/auth/auth.service', () => ({
  authService: { login: vi.fn() },
}))

// Hook local para leer el contexto sin depender de la ruta de useAuth
const useAuth = () => useContext(AuthContext)

function renderAuth() {
  return renderHook(() => useAuth(), { wrapper: AuthProvider })
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('arranca sin sesión cuando no hay nada en localStorage', () => {
    const { result } = renderAuth()
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.loading).toBe(false)
  })

  it('restaura la sesión desde localStorage si hay token y usuario', () => {
    const usuario = { email: 'ana@cesde.edu.co', rol: 'ESTUDIANTE' }
    localStorage.setItem(TOKEN_STORAGE_KEY, 'token-guardado')
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(usuario))

    const { result } = renderAuth()

    expect(result.current.user).toEqual(usuario)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('loginContext guarda token y usuario, y actualiza el estado', async () => {
    authService.login.mockResolvedValue({
      accessToken: 'abc123',
      usuario: { email: 'ana@cesde.edu.co', rol: 'ESTUDIANTE' },
    })
    const { result } = renderAuth()

    await act(async () => {
      await result.current.loginContext({
        email: 'ana@cesde.edu.co',
        password: 'Secreta123*',
      })
    })

    expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBe('abc123')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('logout limpia localStorage y reinicia el estado', async () => {
    authService.login.mockResolvedValue({
      accessToken: 'abc123',
      usuario: { email: 'ana@cesde.edu.co', rol: 'ESTUDIANTE' },
    })
    const { result } = renderAuth()

    await act(async () => {
      await result.current.loginContext({ email: 'ana@cesde.edu.co', password: 'x' })
    })

    act(() => {
      result.current.logout()
    })

    expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBeNull()
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })
})