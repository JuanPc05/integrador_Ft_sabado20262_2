# 💻 CESDE Conecta — Frontend Web (`integrador_Ft_sabado20262_2`)

Aplicación Single Page Application (SPA) construida con **React 19 + Vite + Tailwind CSS + Recharts** para la plataforma de innovación abierta **CESDE Conecta**. Se comunica de forma dual con el **Backend Core en Spring Boot (`:8080`)** mediante `springApi` (con interceptor JWT) y con el **Motor de Analítica en Python/FastAPI (`:8000`)** mediante `pythonApi`.

---

## 🏗️ Arquitectura del Ecosistema

| Ecosistema | Directorio | Tecnologías | Puerto | Rol en el Sistema |
| :--- | :--- | :--- | :---: | :--- |
| **1. Backend Core** | `integrador_Bk_sabados20262_2` | Java 21, Spring Boot 3.5, Spring Security 6, MySQL 8 | `8080` | API REST transaccional, autenticación JWT, RBAC por rol y Máquina de Estados Finita (FSM) de retos. |
| **2. Motor Analítica & ETL** | `integrador_API` | Python 3.10+, FastAPI, Pandas, Faker (`es_CO`) | `8000` | Generación de datos sintéticos (`etl/seeder.py`) y cálculo vectorizado de KPIs (`/api/v1/metrics/dashboard`). |
| **3. Frontend Web (Este repo)** | `integrador_Ft_sabado20262_2` | React 19, Vite, Tailwind CSS, Axios, React Router v7, Recharts | `5173` | Landing Page con analítica en vivo, Vitrina Pública de solo lectura (`/retos`), registro condicional y paneles de gestión. |

---

## 🛠️ Prerrequisitos Exactos

* **Node.js:** v18.18+ o v20 LTS (`node -v`)
* **npm:** v9+ (`npm -v`)
* **Java JDK:** 21 LTS (para el Backend en puerto `8080`)
* **Python:** 3.10+ (para el Motor Analítico en puerto `8000`)
* **MySQL:** 8.0+ (con la base de datos `proyecta_db` en puerto `3306`)

---

## 🚀 Guía Paso a Paso de Ejecución Completa

### Paso 1: Base de Datos (`proyecta_db`)
Crea la base de datos en MySQL e importa el script `usuarios.sql` (o deja que `DataSeedConfig.java` siembre los datos iniciales automáticamente al arrancar Spring Boot):

```sql
CREATE DATABASE IF NOT EXISTS proyecta_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```bash
mysql -u root -p proyecta_db < usuarios.sql
```

### Paso 2: Backend Spring Boot (`Puerto 8080`)
Verifica las credenciales en `integrador_Bk_sabados20262_2/src/main/resources/application.properties` y ejecuta:

```bash
cd ../integrador_Bk_sabados20262_2
.\mvnw.cmd clean install -DskipTests
.\mvnw.cmd spring-boot:run
```

### Paso 3: Motor Python / FastAPI (`Puerto 8000`)
```bash
cd ../integrador_API
python -m venv venv
.\venv\Scripts\Activate.ps1   # En Linux/Mac: source venv/bin/activate
pip install fastapi "uvicorn[standard]" pandas faker requests pydantic mysql-connector-python

# Poblar datos sintéticos en Spring Boot (Opcional)
python -m etl.seeder

# Iniciar servidor de analítica
uvicorn api.main:app --reload --port 8000
```

### Paso 4: Frontend React (`Puerto 5173`)
1. Verifica el archivo `.env.development` en la raíz de `integrador_Ft_sabado20262_2`:
   ```env
   VITE_SPRING_API_URL=http://localhost:8080
   VITE_PYTHON_API_URL=http://localhost:8000
   ```
2. Instala las dependencias y levanta Vite:
   ```bash
   cd ../integrador_Ft_sabado20262_2
   npm install
   npm run dev
   ```
3. Abre en el navegador: **`http://localhost:5173`**

---

## 🚦 Orden de Ejecución Recomendado

1. **MySQL (`:3306`)**
2. **Backend Spring Boot (`:8080`)**
3. **Motor Analítico Python (`:8000`)**
4. **Frontend React (`:5173`)**

---

## 🧭 Rutas Principales del Frontend

| Ruta | Vista / Componente | Nivel de Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPage.jsx` | Público | Página principal con sección de analítica en vivo (`LandingAnalyticsSection.jsx`) y retos destacados. |
| `/retos` o `/explorar` | `PublicChallengesPage.jsx` | Público (Solo Lectura) | Vitrina pública de convocatorias abiertas (`EN_CONVOCATORIA`) con filtro y botón `"Postularse"` hacia `/login`. |
| `/login` | `LoginPage.jsx` | Público | Inicio de sesión con emisión de JWT. |
| `/registro` | `RegisterForm.jsx` | Público | Registro con selector condicional de empresa cuando el rol es `REPRESENTANTE_EMPRESA`. |
| `/dashboard` | `DashboardPage.jsx` | Protegido (JWT) | Panel de retos filtrado por rol (RBAC en backend) y gestión de estados. |
| `/dashboard/retos/nuevo` | `CrearRetoPage.jsx` | Protegido (JWT) | Formulario de creación de retos con bloqueo de selector de empresa (`UX Security`) para representantes. |
| `/dashboard/analytics` | `Dashboard.jsx` | Protegido (JWT) | Dashboard ejecutivo de KPIs conectado a FastAPI (`:8000`). |

---

## 🔐 Credenciales de Prueba

| Rol | Email | Contraseña | Comportamiento en la Interfaz |
| :--- | :--- | :--- | :--- |
| **`ADMIN_UNIVERSIDAD`** | `admin.conecta@cesde.edu.co` | `Cesde2026*` | Ve los retos de todas las empresas, selector de empresa habilitado al crear retos y acceso completo al Dashboard Analítico. |
| **`REPRESENTANTE_EMPRESA`** | `representante@techantioquia.com` | `Cesde2026*` | Ve exclusivamente los retos de **Tech Antioquia SAS** y tiene su empresa preseleccionada y bloqueada al crear nuevos retos. |
| **`ESTUDIANTE`** | `estudiante.conecta@cesde.edu.co` | `Cesde2026*` | Visualiza las convocatorias abiertas en estado `EN_CONVOCATORIA`. |
