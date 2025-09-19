# Sistema de Autenticación - Next.js

## 📋 Descripción

Este proyecto implementa un sistema de autenticación simple con Next.js que incluye:

- **Página de Login** (`/login`) - Primera vista que se muestra siempre
- **Dashboard/Home** (`/`) - Vista protegida que requiere autenticación
- **Validaciones de formulario** con manejo de errores
- **Credenciales hardcodeadas**: `admin` / `admin`
- **Redirección automática** al login si no está autenticado

## 🚀 Cómo ejecutar la aplicación

1. **Instalar dependencias** (si no están instaladas):
   ```bash
   pnpm install
   ```

2. **Ejecutar el servidor de desarrollo**:
   ```bash
   pnpm dev
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## 🔐 Credenciales de acceso

- **Usuario**: `admin`
- **Contraseña**: `admin`

## 📁 Estructura del proyecto

```
app/
├── components/
│   └── ProtectedRoute.tsx     # Componente para proteger rutas
├── hooks/
│   └── useAuth.ts            # Hook personalizado para autenticación
├── login/
│   └── page.tsx              # Página de login
├── layout.tsx                # Layout principal
├── page.tsx                  # Dashboard/Home (ruta protegida)
└── globals.css               # Estilos globales
```

## ✨ Características implementadas

### 🔑 Página de Login (`/login`)
- Formulario con campos de usuario y contraseña
- Validaciones en tiempo real:
  - Campo usuario requerido
  - Campo contraseña requerido (mínimo 3 caracteres)
- Manejo de errores de autenticación
- Estado de carga durante el login
- Diseño responsive con Tailwind CSS

### 🏠 Dashboard/Home (`/`)
- Vista protegida que requiere autenticación
- Header con información del usuario y botón de logout
- Dashboard con tarjetas informativas
- Información del sistema en tiempo real
- Botón de cerrar sesión

### 🛡️ Sistema de Protección
- **Hook `useAuth`**: Maneja el estado de autenticación
- **Componente `ProtectedRoute`**: Protege rutas que requieren autenticación
- **Redirección automática**: Si no está autenticado, redirige al login
- **Persistencia**: Usa localStorage para mantener la sesión

## 🔄 Flujo de la aplicación

1. **Acceso inicial**: Siempre redirige a `/login`
2. **Login exitoso**: Redirige a `/` (dashboard)
3. **Acceso directo a `/`**: Si no está autenticado, redirige a `/login`
4. **Logout**: Limpia la sesión y redirige a `/login`

## 🎨 Tecnologías utilizadas

- **Next.js 15.5.3** - Framework de React
- **React 19.1.0** - Biblioteca de UI
- **Tailwind CSS 4** - Framework de CSS
- **TypeScript** - Tipado estático
- **Playwright 1.55.0** - Testing E2E automatizado
- **localStorage** - Persistencia de sesión

## 🧪 Testing con Playwright

### 📋 Tests Automatizados E2E

Este proyecto incluye tests end-to-end automatizados con **Playwright** para garantizar el correcto funcionamiento del sistema de autenticación.

### 🚀 Comandos de Testing

```bash
# Instalar navegadores de Playwright (solo la primera vez)
pnpm test:install

# Ejecutar todos los tests E2E
pnpm test:e2e

# Ejecutar tests con interfaz visual (headed mode)
pnpm test:e2e:headed

# Ejecutar tests con interfaz UI interactiva
pnpm test:e2e:ui

# Ver reporte de tests ejecutados
pnpm test:e2e:report

# Ejecutar tests en modo debug
pnpm test:e2e:debug

# Ejecutar tests específicos
pnpm test:login        # Solo tests de login
pnpm test:auth         # Solo tests de flujo de autenticación
pnpm test:dashboard    # Solo tests del dashboard
```

### 🔍 Tests Implementados

#### **Login Tests** (`tests/login.spec.ts`)
- ✅ **Redirección automática**: Verifica que `/` redirige a `/login`
- ✅ **Elementos del formulario**: Valida que todos los campos estén presentes
- ✅ **Placeholders correctos**: Verifica textos de ayuda en los campos
- ✅ **Estado inicial**: Botón deshabilitado hasta completar campos
- ✅ **Login exitoso**: Redirección al dashboard con credenciales válidas

#### **Configuración de Tests**
- **Navegadores**: Chrome, Firefox, Safari (WebKit)
- **Servidor automático**: Inicia `pnpm dev` automáticamente
- **Limpieza**: localStorage se limpia antes de cada test
- **Timeouts**: Configurados para desarrollo local
- **Reportes**: HTML report generado automáticamente

### 📊 Cobertura de Tests

Los tests cubren los siguientes escenarios:

1. **Flujo de autenticación completo**
2. **Validaciones de formulario**
3. **Redirecciones automáticas**
4. **Protección de rutas**
5. **Manejo de estado de sesión**
6. **Interfaz de usuario responsive**

### 🔧 Configuración Playwright

El archivo `playwright.config.ts` incluye:
- **Base URL**: `http://localhost:3000`
- **Paralelización**: Tests en paralelo para mayor velocidad
- **Retry**: Reintentos automáticos en CI/CD
- **Traces**: Captura de trazas en fallos para debugging
- **Web Server**: Inicio automático del servidor de desarrollo

## 🧪 Cómo probar manualmente

1. **Acceder a la aplicación**: Automáticamente te llevará al login
2. **Probar credenciales incorrectas**: Verás mensajes de error
3. **Login exitoso**: Usa `admin`/`admin` para acceder al dashboard
4. **Probar protección de rutas**: Intenta acceder directamente a `/` sin estar logueado
5. **Logout**: Usa el botón "Cerrar Sesión" para salir

## 📝 Validaciones implementadas

- **Usuario requerido**: No puede estar vacío
- **Contraseña requerida**: Mínimo 3 caracteres
- **Credenciales válidas**: Solo `admin`/`admin` permite el acceso
- **Manejo de errores**: Mensajes claros para el usuario

## 🔧 Personalización

Para cambiar las credenciales, edita el archivo `app/login/page.tsx` en la línea:
```typescript
if (username === 'admin' && password === 'admin') {
```

Para agregar más usuarios o lógica de autenticación, modifica el hook `useAuth.ts`.
