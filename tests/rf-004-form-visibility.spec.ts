import { test, expect } from '@playwright/test';
import { appUrls } from './testData/urls';

test('CT-RF-004-01 Visualización del formulario de programación de alquiler', async ({ page }) => {
    const itemId = 1;
    await page.goto(`${appUrls.home}items/${itemId}`);
    await page.waitForLoadState('networkidle');

    // Inputs del formulario
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#phone')).toBeVisible();
    await expect(page.locator('#start')).toBeVisible();
    await expect(page.locator('#end')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Request rental' })).toBeVisible();
});
