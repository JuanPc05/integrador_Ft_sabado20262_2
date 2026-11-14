import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('muestra el texto que recibe', () => {
    render(<Button>Guardar</Button>)
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument()
  })

  it('es type="button" por defecto, para no enviar formularios sin querer', () => {
    render(<Button>Guardar</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('llama a onClick cuando el usuario hace clic', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Enviar</Button>)

    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('no llama a onClick cuando está deshabilitado', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Enviar</Button>)

    const boton = screen.getByRole('button', { name: 'Enviar' })
    await user.click(boton)

    expect(boton).toBeDisabled()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('muestra los iconos izquierdo y derecho cuando se pasan', () => {
    render(
      <Button iconLeft={<i>izq</i>} iconRight={<i>der</i>}>
        Siguiente
      </Button>
    )
    expect(screen.getByText('izq')).toBeInTheDocument()
    expect(screen.getByText('der')).toBeInTheDocument()
  })
})