import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import PasswordField from './PasswordField'

describe('PasswordField', () => {
  it('oculta la contraseña por defecto', () => {
    render(<PasswordField value="Secreta123" onChange={() => {}} />)
    expect(screen.getByLabelText('Contraseña')).toHaveAttribute('type', 'password')
  })

  it('alterna la visibilidad al pulsar el botón del ojo', async () => {
    const user = userEvent.setup()
    render(<PasswordField value="Secreta123" onChange={() => {}} />)

    const campo = screen.getByLabelText('Contraseña')
    const toggle = screen.getByRole('button', { name: /alternar visibilidad/i })

    await user.click(toggle)
    expect(campo).toHaveAttribute('type', 'text')

    await user.click(toggle)
    expect(campo).toHaveAttribute('type', 'password')
  })

  it('avisa los cambios mediante onChange al escribir', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<PasswordField value="" onChange={onChange} />)

    await user.type(screen.getByLabelText('Contraseña'), 'abc')

    expect(onChange).toHaveBeenCalledTimes(3)
  })

  it('muestra el indicador de seguridad', () => {
    render(<PasswordField value="" onChange={() => {}} />)
    expect(screen.getByText('Seguridad de la contraseña')).toBeInTheDocument()
  })
})