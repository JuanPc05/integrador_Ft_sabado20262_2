import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import { ProtectedRoute } from './ProtectedRoute'

let estadoAuth = { isAuthenticated: false, loading: false }

vi.mock('@/features/auth/useAuth', () => ({
  useAuth: () => estadoAuth,
}))

function renderRutas() {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/login" element={<p>Pantalla de login</p>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <p>Contenido privado</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProtectedRoute', () => {
  it('muestra el contenido si el usuario está autenticado', () => {
    estadoAuth = { isAuthenticated: true, loading: false }
    renderRutas()

    expect(screen.getByText('Contenido privado')).toBeInTheDocument()
  })

  it('redirige a /login si el usuario no está autenticado', () => {
    estadoAuth = { isAuthenticated: false, loading: false }
    renderRutas()

    expect(screen.getByText('Pantalla de login')).toBeInTheDocument()
    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument()
  })

  it('muestra "Verificando sesión..." y NO redirige mientras carga', () => {
    estadoAuth = { isAuthenticated: false, loading: true }
    renderRutas()

    expect(screen.getByText('Verificando sesión...')).toBeInTheDocument()
    expect(screen.queryByText('Pantalla de login')).not.toBeInTheDocument()
  })
})