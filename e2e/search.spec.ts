import { test, expect } from '@playwright/test';

test.describe('Página de Búsqueda', () => {
  test('debe mostrar la página de búsqueda', async ({ page }) => {
    await page.goto('/search');

    // Verifica que estamos en la página correcta
    await expect(page).toHaveURL('/search');
  });

  test('debe realizar una búsqueda desde el formulario de inicio', async ({ page }) => {
    await page.goto('/');

    // Llenar el formulario de búsqueda
    await page.getByPlaceholder('Search by style, color, or designer').fill('silk');

    // Seleccionar una talla
    await page.getByRole('combobox', { name: 'Size' }).selectOption('M');

    // Enviar el formulario
    await page.getByRole('button', { name: 'Search dresses' }).click();

    // Verifica que navegó a la página de búsqueda con parámetros
    await expect(page).toHaveURL(/\/search\?q=silk/);
  });

  test('debe buscar con fechas', async ({ page }) => {
    await page.goto('/');

    // Obtener fechas
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const startDate = today.toISOString().slice(0, 10);
    const endDate = tomorrow.toISOString().slice(0, 10);

    // Llenar fechas
    await page.getByLabel('Start date').fill(startDate);
    await page.getByLabel('End date').fill(endDate);

    // Enviar
    await page.getByRole('button', { name: 'Search dresses' }).click();

    // Verifica que navegó con los parámetros
    await expect(page).toHaveURL(/\/search/);
  });

  test('debe navegar a Browse all desde Featured picks', async ({ page }) => {
    await page.goto('/');

    // Scroll a la sección de featured
    await page.getByRole('heading', { name: 'Featured picks' }).scrollIntoViewIfNeeded();

    // Click en Browse all
    await page.getByRole('link', { name: 'Browse all →' }).click();

    // Verifica navegación
    await expect(page).toHaveURL('/search');
  });
});

