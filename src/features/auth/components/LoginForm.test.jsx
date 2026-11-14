import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
// Usamos el alias @ para que no importe en qué carpeta esté el test
import { LoginForm } from '@/features/auth/LoginForm'

// 1. Mockeamos el hook de autenticación
const mockLoginContext = vi.fn()
let mockLoading = false

vi.mock('@/features/auth/useAuth', () => ({
  useAuth: () => ({
    loginContext: mockLoginContext,
    loading: mockLoading,
  }),
}))

// 2. Mockeamos la navegación de react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLoading = false
    // Silenciamos el console.log que tiene el componente
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renderiza los campos y el botón de inicio de sesión', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument()
  })

  it('muestra y oculta la contraseña al hacer clic en el botón del ojo', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText(/^Contraseña$/i)
    expect(passwordInput).toHaveAttribute('type', 'password')

    const toggleButton = screen.getByRole('button', { name: /Mostrar contraseña/i })
    await user.click(toggleButton)

    expect(passwordInput).toHaveAttribute('type', 'text')
    expect(screen.getByRole('button', { name: /Ocultar contraseña/i })).toBeInTheDocument()
  })

  it('envía el correo sin espacios en los extremos y navega a /dashboard', async () => {
    const user = userEvent.setup()
    mockLoginContext.mockResolvedValueOnce({ accessToken: 'abc' })
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/Correo electrónico/i), '  ana@cesde.edu.co  ')
    await user.type(screen.getByLabelText(/^Contraseña$/i), 'Secreta123*')
    await user.click(screen.getByRole('button', { name: /Iniciar Sesión/i }))

    expect(mockLoginContext).toHaveBeenCalledWith({
      email: 'ana@cesde.edu.co', // Se envía sin espacios
      password: 'Secreta123*',
    })
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true })
  })

  it('llama a onSuccess en lugar de navegar si se pasa la prop', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    mockLoginContext.mockResolvedValueOnce({ accessToken: 'abc' })

    render(<LoginForm onSuccess={onSuccess} />)

    await user.type(screen.getByLabelText(/Correo electrónico/i), 'ana@cesde.edu.co')
    await user.type(screen.getByLabelText(/^Contraseña$/i), 'x')
    await user.click(screen.getByRole('button', { name: /Iniciar Sesión/i }))

    expect(onSuccess).toHaveBeenCalledWith({ accessToken: 'abc' })
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('muestra el mensaje de error si el login falla', async () => {
    const user = userEvent.setup()
    mockLoginContext.mockRejectedValueOnce(new Error('Credenciales inválidas'))
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/Correo electrónico/i), 'ana@cesde.edu.co')
    await user.type(screen.getByLabelText(/^Contraseña$/i), 'mala')
    await user.click(screen.getByRole('button', { name: /Iniciar Sesión/i }))

    const alerta = await screen.findByRole('alert')
    expect(alerta).toHaveTextContent('Credenciales inválidas')
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('muestra un mensaje genérico si el error no tiene mensaje propio', async () => {
    const user = userEvent.setup()
    mockLoginContext.mockRejectedValueOnce(new Error())
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/Correo electrónico/i), 'ana@cesde.edu.co')
    await user.type(screen.getByLabelText(/^Contraseña$/i), 'mala')
    await user.click(screen.getByRole('button', { name: /Iniciar Sesión/i }))

    const alerta = await screen.findByRole('alert')
    expect(alerta).toHaveTextContent(/Credenciales inválidas o error de conexión/i)
  })

  it('deshabilita los campos y muestra "Iniciando sesión..." cuando loading es true', () => {
    mockLoading = true
    render(<LoginForm />)

    expect(screen.getByLabelText(/Correo electrónico/i)).toBeDisabled()
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /Iniciando sesión.../i })).toBeDisabled()
  })
})