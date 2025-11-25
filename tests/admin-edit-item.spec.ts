import { test, expect } from './fixtures/auth';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

test('Admin - Edit Item (básico)', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const admin = new AdminDashboardPage(page);
    await admin.expectDashboardVisible();

    const originalName = `Playwright Edit Dress ${Date.now()}`;

    // Crear un item nuevo para editar
    await page.getByRole('button', { name: 'Add Item' }).click();
    await expect(page.getByRole('heading', { name: 'Add New Item' })).toBeVisible();
    await page.getByPlaceholder('E.g: Elegant Evening Dress').fill(originalName);
    await page.getByPlaceholder('E.g: 79').fill('39');
    await page.getByPlaceholder('XS, S, M, L, XL').fill('M, L');
    await page.getByPlaceholder('E.g: champagne, black, red').fill('red');
    await page.getByPlaceholder('Describe the item...').fill('Texto para editar luego');

    page.once('dialog', async (dialog) => {
        await dialog.accept();
    });
    await page.getByRole('button', { name: 'Save item' }).click();
    await page.waitForURL('**/admin*', { waitUntil: 'networkidle' });

    const row = page.locator('table tbody tr').filter({ hasText: originalName });
    await expect(row).toBeVisible();

    // Abrir modal de edición (espera el botón, haz click y espera el heading con más tolerancia)
    const editBtn = row.getByRole('button', { name: 'Edit' });
    await expect(editBtn).toBeVisible();
    await editBtn.click();
    const editHeading = page.getByRole('heading', { name: 'Edit Item' });
    // Aumentar timeout para ambientes lentos / recargas
    await expect(editHeading).toBeVisible({ timeout: 15000 });

    const modal = page.locator('div').filter({ has: editHeading });
    await modal.locator('input[type="text"]').first().fill(originalName + ' UPDATED');

    // Aceptar confirm + alert automáticamente
    page.on('dialog', async (dialog) => {
        await dialog.accept();
    });

    await page.getByRole('button', { name: 'Confirm changes' }).click();
    await page.waitForURL('**/admin*', { waitUntil: 'networkidle' });

    const updatedRow = page.locator('table tbody tr').filter({ hasText: originalName + ' UPDATED' });
    await expect(updatedRow).toBeVisible();
});
