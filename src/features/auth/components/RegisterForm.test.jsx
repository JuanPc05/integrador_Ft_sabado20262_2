import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { RegisterForm } from './RegisterForm'

// 1. Mockeamos react-router-dom (para el Link y el useNavigate)
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
  }
})

// 2. Mockeamos el servicio de autenticación y la API (axios)
vi.mock('@/features/auth/auth.service', () => ({
  authService: { register: vi.fn() },
}))
vi.mock('@/services/apiClient', () => ({
  springApi: { get: vi.fn() },
}))

// 3. Mockeamos los campos personalizados para que rendericen inputs reales y accesibles
vi.mock('./InputField', () => ({
  default: ({ id, label, value, onChange, ...props }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} value={value} onChange={onChange} {...props} />
    </div>
  ),
}))

vi.mock('./PasswordField', () => ({
  default: ({ label, value, onChange, ...props }) => (
    <div>
      <label htmlFor="password">{label}</label>
      <input id="password" name="password" type="password" value={value} onChange={onChange} {...props} />
    </div>
  ),
}))

vi.mock('./SelectField', () => ({
  default: ({ id, label, options, value, onChange, ...props }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} value={value} onChange={onChange} {...props}>
        <option value="">Seleccione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  ),
}))

// Importamos los mocks después de declararlos
import { authService } from '@/features/auth/auth.service'
import { springApi } from '@/services/apiClient'

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza los campos básicos y el botón de crear cuenta', () => {
    render(<RegisterForm />)

    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Rol en la plataforma/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Crear Cuenta/i })).toBeInTheDocument()
  })

  it('carga y muestra las empresas si se selecciona el rol REPRESENTANTE_EMPRESA', async () => {
    const user = userEvent.setup()
    springApi.get.mockResolvedValueOnce({
      data: [{ id: 1, nombre: 'Tech Innovators', nit: '123' }],
    })

    render(<RegisterForm />)

    // Seleccionar el rol de empresa
    await user.selectOptions(screen.getByLabelText(/Rol en la plataforma/i), 'REPRESENTANTE_EMPRESA')

    // Esperar a que se cargue el select de empresa
    await waitFor(() => {
      expect(springApi.get).toHaveBeenCalledWith('/api/empresas')
    })

    expect(await screen.findByLabelText(/Organización \/ Empresa aliada/i)).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /Tech Innovators/i })).toBeInTheDocument()
  })

  it('muestra error si intenta registrar representante sin elegir empresa', async () => {
    const user = userEvent.setup()
    // Hacemos que la petición de empresas se quede "colgada" para que el select no cargue
    springApi.get.mockReturnValueOnce(new Promise(() => {}))

    render(<RegisterForm />)

    await user.type(screen.getByLabelText(/Nombre completo/i), 'Carolina')
    await user.type(screen.getByLabelText(/Correo electrónico/i), 'ana@empresa.com')
    await user.type(screen.getByLabelText(/^Contraseña$/i), 'Secreta123*')
    
    await user.selectOptions(screen.getByLabelText(/Rol en la plataforma/i), 'REPRESENTANTE_EMPRESA')
    
    // Hacemos submit inmediatamente sin seleccionar empresa
    await user.click(screen.getByRole('button', { name: /Crear Cuenta/i }))

    // Verificamos el error
    expect(await screen.findByRole('alert')).toHaveTextContent(/Por favor selecciona la empresa/i)
    expect(authService.register).not.toHaveBeenCalled()
  })

  it('registra al usuario, limpia espacios y navega a /login', async () => {
    const user = userEvent.setup()
    authService.register.mockResolvedValueOnce({})

    render(<RegisterForm />)

    await user.type(screen.getByLabelText(/Nombre completo/i), '  Carolina Herrera  ')
    await user.type(screen.getByLabelText(/Correo electrónico/i), '  ana@empresa.com  ')
    await user.type(screen.getByLabelText(/^Contraseña$/i), 'Secreta123*')
    await user.selectOptions(screen.getByLabelText(/Rol en la plataforma/i), 'ESTUDIANTE')
    
    await user.click(screen.getByRole('button', { name: /Crear Cuenta/i }))

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith({
        nombreCompleto: 'Carolina Herrera', // Con trim
        email: 'ana@empresa.com',           // Con trim
        password: 'Secreta123*',
        rol: 'ESTUDIANTE',
        idEmpresa: null,
        activo: true,
      })
    })
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('modo edición: no envía la contraseña si se deja vacía', async () => {
    const user = userEvent.setup()
    authService.register.mockResolvedValueOnce({})
    
    const initialData = { email: 'ana@empresa.com', nombreCompleto: 'Ana', rol: 'ESTUDIANTE', activo: true }
    render(<RegisterForm initialData={initialData} />)

    // Verificamos que el botón dice "Guardar Cambios"
    expect(screen.getByRole('button', { name: /Guardar Cambios/i })).toBeInTheDocument()
    
    // Hacemos submit sin tocar la contraseña (que está vacía)
    await user.click(screen.getByRole('button', { name: /Guardar Cambios/i }))

    await waitFor(() => {
      const payloadEnviado = authService.register.mock.calls[0][0]
      expect(payloadEnviado.password).toBeUndefined() // No se envía
      expect(payloadEnviado.nombreCompleto).toBe('Ana')
    })
  })

  it('muestra el error de la API si el registro falla', async () => {
    const user = userEvent.setup()
    authService.register.mockRejectedValueOnce(new Error('El correo ya está registrado'))

    render(<RegisterForm />)

    await user.type(screen.getByLabelText(/Nombre completo/i), 'Carolina')
    await user.type(screen.getByLabelText(/Correo electrónico/i), 'ana@empresa.com')
    await user.type(screen.getByLabelText(/^Contraseña$/i), 'Secreta123*')
    await user.selectOptions(screen.getByLabelText(/Rol en la plataforma/i), 'ESTUDIANTE')
    
    await user.click(screen.getByRole('button', { name: /Crear Cuenta/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent('El correo ya está registrado')
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})