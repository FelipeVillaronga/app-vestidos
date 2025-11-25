import { test, expect } from './fixtures/auth';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

test('Admin - Add Item (básico)', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const admin = new AdminDashboardPage(page);
    await admin.expectDashboardVisible();

    const itemName = `Playwright Test Dress ${Date.now()}`;

    await page.getByRole('button', { name: 'Add Item' }).click();
    await expect(page.getByRole('heading', { name: 'Add New Item' })).toBeVisible();

    await page.getByPlaceholder('E.g: Elegant Evening Dress').fill(itemName);
    await page.getByPlaceholder('E.g: 79').fill('49');
    await page.getByPlaceholder('XS, S, M, L, XL').fill('S, M');
    await page.getByPlaceholder('E.g: champagne, black, red').fill('black');
    await page.getByPlaceholder('Describe the item...').fill('Prueba básica de Playwright - añadir ítem');

    page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain('Item added successfully');
        await dialog.accept();
    });

    await page.getByRole('button', { name: 'Save item' }).click();
    await page.waitForURL('**/admin*', { waitUntil: 'networkidle' });

    const addedRow = page.locator('table tbody tr').filter({ hasText: itemName });
    await expect(addedRow).toBeVisible();
});
