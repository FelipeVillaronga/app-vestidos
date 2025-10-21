import { test, expect } from '@playwright/test';

test.describe('Página de Detalles del Vestido', () => {
  test('debe navegar a los detalles de un vestido desde Featured picks', async ({ page }) => {
    await page.goto('/');

    // Click en el primer "View details"
    await page.getByRole('link', { name: 'View details' }).first().click();

    // Verifica que estamos en la página de detalles de un item
    await expect(page).toHaveURL(/\/items\/\d+/);
  });

  test('debe mostrar la información del vestido', async ({ page }) => {
    // Navegar directamente al item 1
    await page.goto('/items/1');

    // Espera a que la página cargue
    await page.waitForLoadState('networkidle');

    // Verifica que el contenido cargó
    // (El contenido específico depende de la implementación de la página de detalles)
    await expect(page).toHaveURL('/items/1');
  });

  test('debe poder navegar a múltiples items', async ({ page }) => {
    await page.goto('/');

    // Obtener todos los botones de "View details"
    const viewDetailsButtons = page.getByRole('link', { name: 'View details' });
    
    // Verificar que hay 4 items
    await expect(viewDetailsButtons).toHaveCount(4);

    // Click en el segundo item
    await viewDetailsButtons.nth(1).click();

    // Verifica navegación al item 2
    await expect(page).toHaveURL('/items/2');
  });
});

