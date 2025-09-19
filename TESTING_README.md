# Testing Guide - Sistema de Autenticación

## 📋 Descripción

Esta guía cubre todos los tests end-to-end (E2E) implementados con Playwright para el sistema de autenticación Next.js.

## 🚀 Configuración y Ejecución

### Prerrequisitos
```bash
# Instalar dependencias (si no están instaladas)
npm install

# Instalar navegadores de Playwright
npx playwright install
```

### Comandos de Testing

```bash
# Ejecutar todos los tests
npx playwright test

# Ejecutar tests en modo headed (ver navegador)
npx playwright test --headed

# Ejecutar tests en un navegador específico
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Ejecutar un archivo de test específico
npx playwright test tests/login.spec.ts

# Ejecutar tests con interfaz gráfica
npx playwright test --ui

# Generar reporte HTML
npx playwright show-report
```

### Scripts de Package.json Recomendados

Agrega estos scripts a tu `package.json`:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report",
    "test:e2e:debug": "playwright test --debug",
    "test:login": "playwright test tests/login.spec.ts",
    "test:auth": "playwright test tests/auth-flow.spec.ts",
    "test:dashboard": "playwright test tests/dashboard.spec.ts"
  }
}
```

## 📁 Estructura de Tests

```
tests/
├── utils/
│   └── test-helpers.ts          # Utilidades y helpers para tests
├── login.spec.ts                # Tests completos de la página de login
├── login-with-helpers.spec.ts   # Tests usando helpers (ejemplo)
├── auth-flow.spec.ts           # Tests del flujo de autenticación
└── dashboard.spec.ts           # Tests del dashboard
```

## 🧪 Cobertura de Tests

### 📝 Login Page (`login.spec.ts`)

#### Elementos de UI
- ✅ Redirección automática al login
- ✅ Visualización de formulario completo
- ✅ Panel de reglas de validación
- ✅ Credenciales de prueba visibles

#### Validación de Usuario
- ✅ Campo requerido
- ✅ Longitud mínima (2 caracteres)
- ✅ Longitud máxima (50 caracteres)
- ✅ Caracteres válidos (a-z, A-Z, 0-9, ., -, _)
- ✅ Sin espacios al inicio/final
- ✅ Formatos válidos múltiples

#### Validación de Contraseña
- ✅ Campo requerido
- ✅ Longitud mínima (3 caracteres)
- ✅ Longitud máxima (128 caracteres)
- ✅ Sin espacios
- ✅ Al menos una letra

#### Envío de Formulario
- ✅ Botón habilitado/deshabilitado según validación
- ✅ Estado de carga durante envío
- ✅ Login exitoso con credenciales correctas
- ✅ Error con credenciales incorrectas
- ✅ Error con credenciales parcialmente correctas

#### Validación en Tiempo Real
- ✅ Validación después del primer blur
- ✅ Feedback inmediato al escribir

#### Elementos Visuales
- ✅ Iconos de error y éxito
- ✅ Clases CSS correctas según estado
- ✅ Transiciones y animaciones

#### Accesibilidad
- ✅ Labels y atributos ARIA
- ✅ Navegación por teclado
- ✅ Envío con tecla Enter
- ✅ Atributos HTML5 de validación

#### Diseño Responsive
- ✅ Vista móvil (375px)
- ✅ Vista tablet (768px)
- ✅ Elementos visibles en todos los tamaños

### 🔐 Authentication Flow (`auth-flow.spec.ts`)

#### Flujo de Autenticación
- ✅ Redirección de usuarios no autenticados
- ✅ Mantenimiento del estado de autenticación
- ✅ Persistencia después de recarga de página
- ✅ Logout exitoso
- ✅ Redirección después de logout
- ✅ Navegación directa a rutas protegidas

#### Estados de Sesión
- ✅ Estado de carga durante verificación
- ✅ Múltiples intentos de login
- ✅ Limpieza de errores en login exitoso
- ✅ Manejo del botón de retroceso
- ✅ Simulación de timeout de sesión

### 🏠 Dashboard (`dashboard.spec.ts`)

#### Elementos del Header
- ✅ Logo visible
- ✅ Mensaje de bienvenida personalizado
- ✅ Botón de logout funcional

#### Contenido Principal
- ✅ Título del dashboard
- ✅ Mensaje de bienvenida con nombre de usuario
- ✅ Tarjetas de funcionalidades

#### Panel de Información del Sistema
- ✅ Información del usuario actual
- ✅ Estado de conexión
- ✅ Fecha y hora de última conexión
- ✅ Estado de sesión

#### Diseño y Estilo
- ✅ Layout responsivo
- ✅ Iconos en tarjetas
- ✅ Esquema de colores correcto
- ✅ Grid de tarjetas

#### Funcionalidad
- ✅ Logout desde dashboard
- ✅ Manejo de recarga de página
- ✅ Navegación por teclado
- ✅ Atributos de accesibilidad

## 🛠️ Utilidades de Testing (`test-helpers.ts`)

### AuthHelpers
- `login()` - Login automático
- `logout()` - Logout automático
- `clearAuth()` - Limpiar estado de autenticación
- `expectAuthenticated()` - Verificar autenticación
- `expectNotAuthenticated()` - Verificar no autenticación
- `setAuthState()` - Simular sesión existente

### FormHelpers
- `expectFieldError()` - Verificar error en campo
- `expectFieldValid()` - Verificar campo válido
- `expectSubmitDisabled()` - Verificar botón deshabilitado
- `expectSubmitEnabled()` - Verificar botón habilitado
- `fillAndBlur()` - Llenar campo y activar blur

### NavigationHelpers
- `expectRedirectToLogin()` - Verificar redirección a login
- `expectRedirectToDashboard()` - Verificar redirección a dashboard
- `goToAndExpect()` - Navegar y verificar URL

### UIHelpers
- `expectVisible()` - Verificar elemento visible
- `expectNotVisible()` - Verificar elemento no visible
- `expectText()` - Verificar texto exacto
- `expectContainsText()` - Verificar texto contenido
- `expectLoadingState()` - Verificar estado de carga

### ResponsiveHelpers
- `setMobileViewport()` - Configurar vista móvil
- `setTabletViewport()` - Configurar vista tablet
- `setDesktopViewport()` - Configurar vista desktop

## 📊 Datos de Prueba

### Credenciales Válidas
```typescript
{
  username: 'admin',
  password: 'admin'
}
```

### Casos de Prueba de Validación
- **Usernames válidos**: admin, user123, test.user, user-name, user_name
- **Usernames inválidos**: vacío, muy corto, muy largo, caracteres especiales, espacios
- **Passwords válidas**: admin, abc, password123
- **Passwords inválidas**: vacío, muy corta, muy larga, con espacios, solo números

## 🎯 Mejores Prácticas Implementadas

### Organización
- ✅ Tests agrupados por funcionalidad
- ✅ Helpers reutilizables
- ✅ Datos de prueba centralizados
- ✅ Selectores constantes

### Confiabilidad
- ✅ Limpieza de estado antes de cada test
- ✅ Esperas explícitas con timeouts
- ✅ Verificaciones múltiples
- ✅ Manejo de estados asíncronos

### Mantenibilidad
- ✅ Código DRY con helpers
- ✅ Nombres descriptivos
- ✅ Comentarios claros
- ✅ Estructura modular

### Cobertura
- ✅ Happy paths y edge cases
- ✅ Validaciones positivas y negativas
- ✅ Estados de error y éxito
- ✅ Diferentes viewports

## 🚨 Troubleshooting

### Problemas Comunes

**Error: "Test timeout"**
```bash
# Aumentar timeout en playwright.config.ts
timeout: 30 * 1000, // 30 segundos
```

**Error: "Server not running"**
```bash
# Verificar que el servidor esté corriendo
npm run dev
```

**Error: "Element not found"**
```bash
# Usar esperas explícitas
await expect(page.locator('selector')).toBeVisible({ timeout: 10000 });
```

### Debug de Tests
```bash
# Ejecutar en modo debug
npx playwright test --debug

# Ejecutar con headed para ver el navegador
npx playwright test --headed

# Generar traces para análisis
npx playwright test --trace on
```

## 📈 Métricas de Cobertura

- **Total de tests**: 50+ casos de prueba
- **Páginas cubiertas**: Login, Dashboard
- **Flujos cubiertos**: Autenticación completa
- **Navegadores**: Chrome, Firefox, Safari
- **Viewports**: Mobile, Tablet, Desktop
- **Validaciones**: 15+ reglas de validación
- **Estados**: Loading, Error, Success, Empty

## 🔄 CI/CD Integration

Para integrar con CI/CD, agrega a tu pipeline:

```yaml
# GitHub Actions example
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npx playwright test

- name: Upload test results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
```

¡Los tests están listos para ejecutar! Usa `npx playwright test` para comenzar.
