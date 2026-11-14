// Extiende expect con matchers como toBeInTheDocument(), toBeDisabled(), toHaveTextContent()...
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Limpia el DOM y el localStorage entre pruebas para que no se contaminen entre sí
afterEach(() => {
  cleanup()
  localStorage.clear()
})