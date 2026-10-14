# Proyecto Integrador - Frontend 💻🎨

Este repositorio contiene exclusivamente el código del Frontend para nuestro proyecto integrador. Está construido utilizando tecnologías modernas para garantizar un desarrollo rápido, escalable y una excelente experiencia de usuario.

## 🚀 Tecnologías Principales

*   **Librería Core:** [React 18](https://react.dev/)
*   **Empaquetador/Build Tool:** [Vite](https://vitejs.dev/) (Rápido y eficiente)
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first CSS)
*   **Enrutamiento:** [React Router DOM](https://reactrouter.com/) (Navegación SPA)
*   **Linter:** ESLint (Para mantener un código limpio y estandarizado)

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
*   **Node.js**: Versión 18 o superior recomendada.
*   **Git**: Para el control de versiones.

## 🛠️ Instalación y Configuración (Para el equipo)

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio:**
   ```bash
   git clone <AQUI_URL_DE_ESTE_REPOSITORIO>
   ```

2. **Navegar al directorio del proyecto:**
   ```bash
   cd integrador_Ft_sabado20262_2
   ```

3. **Instalar las dependencias:**
   Ejecuta este comando para descargar todas las librerías necesarias (solo se hace la primera vez o cuando alguien añade una nueva librería al `package.json`).
   ```bash
   npm install
   ```

4. **Levantar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *Esto iniciará el servidor local, generalmente en `http://localhost:5173/`. ¡Cualquier cambio que hagas en el código se reflejará instantáneamente en el navegador!*

## 📁 Estructura de Carpetas

Para mantener el proyecto organizado y escalable a medida que crece, seguiremos esta estructura estricta dentro de la carpeta `src/`:

```text
src/
 ├── assets/        # Recursos estáticos (Imágenes, fuentes, iconos .svg)
 ├── components/    # Componentes UI reutilizables (Botones, Navbar, Footer, Modales)
 ├── context/       # Estados globales de la app (ej. AuthContext, ThemeContext)
 ├── hooks/         # Custom hooks de React (ej. useAuth, useFetch)
 ├── layouts/       # Estructuras de página (ej. MainLayout con Navbar/Footer, AuthLayout)
 ├── pages/         # Vistas completas a las que se accede por URL (Home, Login, Dashboard)
 ├── routes/        # Configuración de React Router y Rutas Protegidas
 ├── services/      # Lógica de conexión con nuestro Backend (Spring Boot), ej. api.js
 ├── utils/         # Funciones genéricas de ayuda (formateo de fechas, validaciones)
 ├── App.jsx        # Componente raíz donde se inicializan providers y rutas
 ├── index.css      # Archivo CSS principal (contiene la importación de Tailwind)
 └── main.jsx       # Punto de entrada de la aplicación React
```

### 🧠 Reglas de oro del equipo:
*   **Componentes:** Si es un botón o una tarjeta que se usa en varios lugares, va en `components/`. Si es una pantalla completa, va en `pages/`.
*   **Lógica de negocio:** Evitemos hacer llamados directos al backend (`fetch` o `axios`) directamente en los componentes. Creemos funciones en la carpeta `services/` y usémoslas desde los componentes.