import { render, screen } from '@testing-library/react'
import PasswordStrength from './PasswordStrength'

describe('PasswordStrength', () => {
  it.each([
    ['', 'Seguridad básica'],
    ['abc', 'Seguridad básica'],
    ['abcdef', 'Débil'],
    ['abcdefghij', 'Media'],
    ['Abcdefghi1', 'Buena'],
    ['Abcdefghi1!', 'Excelente'],
  ])('la contraseña "%s" se califica como "%s"', (password, etiqueta) => {
    render(<PasswordStrength value={password} />)
    expect(screen.getByText(etiqueta)).toBeInTheDocument()
  })

  it('siempre muestra el título del indicador', () => {
    render(<PasswordStrength value="" />)
    expect(screen.getByText('Seguridad de la contraseña')).toBeInTheDocument()
  })
})