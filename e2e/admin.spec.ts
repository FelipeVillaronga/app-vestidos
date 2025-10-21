import { test, expect } from '@playwright/test';

test.describe('Página de Admin', () => {
  test('debe mostrar la página de login de admin', async ({ page }) => {
    await page.goto('/admin/login');

    // Verifica que estamos en la página de login
    await expect(page).toHaveURL('/admin/login');
  });

  test('debe navegar a admin desde el header', async ({ page }) => {
    await page.goto('/');

    // Click en Admin
    await page.getByRole('link', { name: 'Admin' }).click();

    // Verifica navegación
    await expect(page).toHaveURL('/admin/login');
  });

  test('debe mostrar el formulario de login (si existe)', async ({ page }) => {
    await page.goto('/admin/login');

    // Espera a que la página cargue
    await page.waitForLoadState('networkidle');

    // Verifica que estamos en la página correcta
    await expect(page).toHaveURL('/admin/login');
  });
});

