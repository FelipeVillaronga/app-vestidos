import { test, expect } from '@playwright/test';
import { appUrls } from './testData/urls';

test('CT-RF-004-02 Intento de programación con campos vacíos', async ({ page }) => {
    const itemId = 1;
    await page.goto(`${appUrls.home}items/${itemId}`);
    await page.waitForLoadState('networkidle');

    // Asegurarse que los campos están vacíos
    await page.locator('#name').fill('');
    await page.locator('#email').fill('');
    await page.locator('#phone').fill('');

    // Click en request rental no debería navegar por la validación
    await page.getByRole('button', { name: 'Request rental' }).click();

    await expect(page).toHaveURL(new RegExp(`/items/${itemId}$`));
    await expect(page.getByText('Rental request submitted successfully!')).toHaveCount(0);
});
