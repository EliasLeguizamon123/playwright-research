import { Page, expect } from '@playwright/test';

/**
 * Utilidades para tests de autenticación
 */
export class AuthHelpers {
  constructor(private page: Page) {}

  /**
   * Realiza login con credenciales válidas
   */
  async login(username: string = 'admin', password: string = 'admin') {
    await this.page.goto('/login');
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.locator('button[type="submit"]').click();
    await expect(this.page).toHaveURL('/');
  }

  /**
   * Realiza logout
   */
  async logout() {
    await this.page.locator('text=Cerrar Sesión').click();
    await expect(this.page).toHaveURL('/login');
  }

  /**
   * Limpia el estado de autenticación
   */
  async clearAuth() {
    await this.page.evaluate(() => localStorage.clear());
  }

  /**
   * Verifica que el usuario esté autenticado
   */
  async expectAuthenticated() {
    const isAuthenticated = await this.page.evaluate(() => localStorage.getItem('isAuthenticated'));
    const username = await this.page.evaluate(() => localStorage.getItem('username'));
    expect(isAuthenticated).toBe('true');
    expect(username).toBeTruthy();
  }

  /**
   * Verifica que el usuario no esté autenticado
   */
  async expectNotAuthenticated() {
    const isAuthenticated = await this.page.evaluate(() => localStorage.getItem('isAuthenticated'));
    const username = await this.page.evaluate(() => localStorage.getItem('username'));
    expect(isAuthenticated).toBeNull();
    expect(username).toBeNull();
  }

  /**
   * Simula una sesión existente
   */
  async setAuthState(username: string = 'admin') {
    await this.page.evaluate((user) => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', user);
    }, username);
  }
}

/**
 * Utilidades para validación de formularios
 */
export class FormHelpers {
  constructor(private page: Page) {}

  /**
   * Verifica que un campo tenga un error específico
   */
  async expectFieldError(fieldId: string, errorMessage: string) {
    await expect(this.page.locator(`text=${errorMessage}`)).toBeVisible();
    await expect(this.page.locator(`#${fieldId}`)).toHaveClass(/border-red-300/);
  }

  /**
   * Verifica que un campo sea válido
   */
  async expectFieldValid(fieldId: string, successMessage: string) {
    await expect(this.page.locator(`text=${successMessage}`)).toBeVisible();
    await expect(this.page.locator(`#${fieldId}`)).not.toHaveClass(/border-red-300/);
  }

  /**
   * Verifica que el botón de submit esté deshabilitado
   */
  async expectSubmitDisabled() {
    await expect(this.page.locator('button[type="submit"]')).toBeDisabled();
  }

  /**
   * Verifica que el botón de submit esté habilitado
   */
  async expectSubmitEnabled() {
    await expect(this.page.locator('button[type="submit"]')).toBeEnabled();
  }

  /**
   * Llena un campo y activa blur para validación
   */
  async fillAndBlur(fieldId: string, value: string) {
    const field = this.page.locator(`#${fieldId}`);
    await field.fill(value);
    await field.blur();
  }
}

/**
 * Utilidades para navegación
 */
export class NavigationHelpers {
  constructor(private page: Page) {}

  /**
   * Verifica redirección a login para usuarios no autenticados
   */
  async expectRedirectToLogin() {
    await expect(this.page).toHaveURL('/login');
  }

  /**
   * Verifica redirección a dashboard para usuarios autenticados
   */
  async expectRedirectToDashboard() {
    await expect(this.page).toHaveURL('/');
  }

  /**
   * Navega a una ruta y verifica la URL
   */
  async goToAndExpect(path: string, expectedUrl: string) {
    await this.page.goto(path);
    await expect(this.page).toHaveURL(expectedUrl);
  }
}

/**
 * Utilidades para elementos UI
 */
export class UIHelpers {
  constructor(private page: Page) {}

  /**
   * Verifica que un elemento esté visible con timeout personalizado
   */
  async expectVisible(selector: string, timeout: number = 5000) {
    await expect(this.page.locator(selector)).toBeVisible({ timeout });
  }

  /**
   * Verifica que un elemento no esté visible
   */
  async expectNotVisible(selector: string) {
    await expect(this.page.locator(selector)).not.toBeVisible();
  }

  /**
   * Verifica que un elemento tenga el texto esperado
   */
  async expectText(selector: string, text: string) {
    await expect(this.page.locator(selector)).toHaveText(text);
  }

  /**
   * Verifica que un elemento contenga el texto esperado
   */
  async expectContainsText(selector: string, text: string) {
    await expect(this.page.locator(selector)).toContainText(text);
  }

  /**
   * Espera a que aparezca el estado de carga
   */
  async expectLoadingState() {
    await expect(this.page.locator('text=Iniciando sesión...')).toBeVisible();
    await expect(this.page.locator('.animate-spin')).toBeVisible();
  }

  /**
   * Verifica que el estado de carga haya desaparecido
   */
  async expectLoadingComplete() {
    await expect(this.page.locator('text=Iniciando sesión...')).not.toBeVisible();
    await expect(this.page.locator('.animate-spin')).not.toBeVisible();
  }
}

/**
 * Utilidades para responsive design
 */
export class ResponsiveHelpers {
  constructor(private page: Page) {}

  /**
   * Configura viewport móvil
   */
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  /**
   * Configura viewport tablet
   */
  async setTabletViewport() {
    await this.page.setViewportSize({ width: 768, height: 1024 });
  }

  /**
   * Configura viewport desktop
   */
  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  /**
   * Verifica que los elementos principales sean visibles en el viewport actual
   */
  async expectMainElementsVisible() {
    await expect(this.page.locator('h1, h2').first()).toBeVisible();
    await expect(this.page.locator('button[type="submit"], button:has-text("Cerrar Sesión")').first()).toBeVisible();
  }
}

/**
 * Datos de prueba
 */
export const TestData = {
  validCredentials: {
    username: 'admin',
    password: 'admin'
  },
  invalidCredentials: [
    { username: 'wrong', password: 'wrong' },
    { username: 'admin', password: 'wrong' },
    { username: 'wrong', password: 'admin' },
    { username: '', password: '' }
  ],
  validUsernames: [
    'admin',
    'user123',
    'test.user',
    'user-name',
    'user_name',
    'ab', // mínimo válido
    'a'.repeat(50) // máximo válido
  ],
  invalidUsernames: [
    { value: '', error: 'El usuario es requerido' },
    { value: 'a', error: 'El usuario debe tener al menos 2 caracteres' },
    { value: 'a'.repeat(51), error: 'El usuario no puede tener más de 50 caracteres' },
    { value: 'user@name', error: 'El usuario solo puede contener letras, números, guiones, puntos y guiones bajos' },
    { value: ' admin ', error: 'El usuario no puede empezar o terminar con espacios' }
  ],
  validPasswords: [
    'admin',
    'abc', // mínimo válido
    'password123',
    'a'.repeat(128) // máximo válido
  ],
  invalidPasswords: [
    { value: '', error: 'La contraseña es requerida' },
    { value: 'ab', error: 'La contraseña debe tener al menos 3 caracteres' },
    { value: 'a'.repeat(129), error: 'La contraseña no puede tener más de 128 caracteres' },
    { value: 'pass word', error: 'La contraseña no puede contener espacios' },
    { value: '123456', error: 'La contraseña debe contener al menos una letra' }
  ]
};

/**
 * Selectores comunes
 */
export const Selectors = {
  // Login page
  usernameInput: '#username',
  passwordInput: '#password',
  submitButton: 'button[type="submit"]',
  loginTitle: 'h2:has-text("Iniciar Sesión")',
  
  // Dashboard page
  dashboardTitle: 'h1:has-text("¡Bienvenido al Dashboard!")',
  welcomeMessage: 'span:has-text("Bienvenido, admin")',
  logoutButton: 'button:has-text("Cerrar Sesión")',
  
  // Common
  loadingSpinner: '.animate-spin',
  errorMessage: '.text-red-600',
  successMessage: '.text-green-600'
};
