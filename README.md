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
   npm install
   ```

2. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
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
- **localStorage** - Persistencia de sesión

## 🧪 Cómo probar

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
