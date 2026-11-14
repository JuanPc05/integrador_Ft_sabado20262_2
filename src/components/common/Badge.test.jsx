import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('muestra su contenido', () => {
    render(<Badge>Activo</Badge>)
    expect(screen.getByText('Activo')).toBeInTheDocument()
  })

  it('muestra el icono cuando se le pasa un nombre', () => {
    render(<Badge icon="check_circle">Aprobado</Badge>)
    // Icon renderiza el nombre del icono como texto (Material Symbols)
    expect(screen.getByText('check_circle')).toBeInTheDocument()
  })

  it('no muestra icono si no se le pasa', () => {
    render(<Badge>Sin icono</Badge>)
    expect(screen.queryByText('check_circle')).not.toBeInTheDocument()
  })
})