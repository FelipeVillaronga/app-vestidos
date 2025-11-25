import { test, expect } from './fixtures/auth';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

test('Admin - Delete Item (básico)', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const admin = new AdminDashboardPage(page);
    await admin.expectDashboardVisible();

    const itemName = `Playwright Delete Dress ${Date.now()}`;

    // Crear un item nuevo para borrar
    await page.getByRole('button', { name: 'Add Item' }).click();
    await expect(page.getByRole('heading', { name: 'Add New Item' })).toBeVisible();
    await page.getByPlaceholder('E.g: Elegant Evening Dress').fill(itemName);
    await page.getByPlaceholder('E.g: 79').fill('29');
    await page.getByPlaceholder('XS, S, M, L, XL').fill('S');
    await page.getByPlaceholder('E.g: champagne, black, red').fill('blue');
    await page.getByPlaceholder('Describe the item...').fill('Prueba básica de Playwright - borrar ítem');

    page.once('dialog', async (dialog) => {
        await dialog.accept();
    });
    await page.getByRole('button', { name: 'Save item' }).click();
    await page.waitForURL('**/admin*', { waitUntil: 'networkidle' });

    const row = page.locator('table tbody tr').filter({ hasText: itemName });
    await expect(row).toBeVisible();

    // Aceptar confirm y cualquier alert
    page.on('dialog', async (dialog) => {
        await dialog.accept();
    });

    await row.getByRole('button', { name: 'Delete' }).click();
    await page.waitForURL('**/admin*', { waitUntil: 'networkidle' });

    const deletedRows = page.locator('table tbody tr').filter({ hasText: itemName });
    // Dar tiempo extra para que la eliminación y recarga termine en servidores lentos
    await expect(deletedRows).toHaveCount(0, { timeout: 15000 });
});
