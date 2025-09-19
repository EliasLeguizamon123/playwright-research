import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Limpiar localStorage antes de cada test
    await page.goto('/', {waitUntil: "domcontentloaded"});
    await page.evaluate(() => localStorage.clear());
  });

  test('should redirect to login page when accessing root', async ({ page }) => {
    // Ignorar errores específicos de Next.js dev tools
    page.on('pageerror', (error) => {
      if (error.message.includes('__nextjs_original-stack-frames') || 
          error.message.includes('access control checks')) {
        console.log('Ignoring Next.js dev tools CORS error:', error.message);
        return;
      }
      throw error;
    });
  
    await page.goto('/', { waitUntil: 'commit' });
    await page.waitForURL('/login', { timeout: 10000 });
    await expect(page).toHaveURL('/login');
  });

  test('should display login form with all elements', async ({ page }) => {
    await page.goto('/login');
    
    // Verificar título de la página
    await expect(page.locator('h2')).toHaveText('Iniciar Sesión');
    
    // Verificar subtítulo
    await expect(page.locator('p').first()).toHaveText('Ingresa tus credenciales para acceder');
    
    // Verificar campos del formulario
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();

    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Verificar placeholders
    await expect(page.locator('#username')).toHaveAttribute('placeholder', 'Usuario (2-50 caracteres)');
    await expect(page.locator('#password')).toHaveAttribute('placeholder', 'Contraseña (3-128 caracteres)');
    
    // Verificar que el botón esté deshabilitado inicialmente
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });

  test('should redirect to dashboard when login is successful', async ({ page }) => {
    await page.goto('/login');
    
    await page.locator('#username').type('admin', { delay: 50 });
    await page.locator('#password').type('admin', { delay: 50 });
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeEnabled({ timeout: 5000 });
    await submitBtn.click();
    
    await expect(page).toHaveURL('/');
  });
});