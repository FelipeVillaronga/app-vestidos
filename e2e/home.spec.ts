import { test, expect } from '@playwright/test';

test.describe('Página de Inicio - GlamRent', () => {
  test('debe mostrar el encabezado principal y el logo', async ({ page }) => {
    await page.goto('/');

    // Verifica que el logo está presente
    await expect(page.getByRole('link', { name: 'GlamRent' })).toBeVisible();

    // Verifica el título principal
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Rent designer dresses');
  });

  test('debe mostrar el menú de navegación', async ({ page }) => {
    await page.goto('/');

    // Verifica los enlaces del menú en el header
    const nav = page.locator('header nav');
    await expect(nav.getByRole('link', { name: 'Browse' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'How it works' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Featured' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'FAQ' })).toBeVisible();
  });

  test('debe mostrar el formulario de búsqueda', async ({ page }) => {
    await page.goto('/');

    // Verifica que el formulario de búsqueda está presente
    await expect(page.getByPlaceholder('Search by style, color, or designer')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search dresses' })).toBeVisible();
  });

  test('debe mostrar los vestidos destacados', async ({ page }) => {
    await page.goto('/');

    // Verifica la sección de destacados
    await expect(page.getByRole('heading', { name: 'Featured picks' })).toBeVisible();

    // Verifica que hay al menos 4 vestidos destacados
    await expect(page.getByRole('link', { name: 'View details' })).toHaveCount(4);
  });

  test('debe mostrar la sección "How it works"', async ({ page }) => {
    await page.goto('/');

    // Verifica que la sección está presente
    await expect(page.getByRole('heading', { name: 'How it works' })).toBeVisible();

    // Verifica los tres pasos usando un selector más específico
    const howItWorksSection = page.locator('section#how');
    await expect(howItWorksSection.getByRole('heading', { name: 'Browse' })).toBeVisible();
    await expect(howItWorksSection.getByRole('heading', { name: 'Rent' })).toBeVisible();
    await expect(howItWorksSection.getByRole('heading', { name: 'Return' })).toBeVisible();
  });

  test('debe navegar a la página de admin', async ({ page }) => {
    await page.goto('/');

    // Click en el link de Admin
    await page.getByRole('link', { name: 'Admin' }).click();

    // Verifica que navegó a la página de admin
    await expect(page).toHaveURL('/admin/login');
  });

  test('debe navegar a la página de búsqueda desde el header', async ({ page }) => {
    await page.goto('/');

    // Click en Browse del menú de navegación
    await page.locator('header nav').getByRole('link', { name: 'Browse' }).click();

    // Verifica que navegó a la página de búsqueda
    await expect(page).toHaveURL('/search');
  });

  test('debe mostrar el footer con enlaces', async ({ page }) => {
    await page.goto('/');

    // Verifica el footer
    await expect(page.getByText('© 2025 GlamRent. All rights reserved.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Terms' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Privacy' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });
});
