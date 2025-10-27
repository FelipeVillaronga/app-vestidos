import { test, expect } from '@playwright/test';
import { appUrls } from './testData/urls';
//CT-RF-002-01 - Página de detalle de artículo con imágenes FHD y calendario.
test.describe('CT-RF-002-01 - Item detail', () => {
    test('muestra imágenes y calendario de disponibilidad', async ({ page }) => {
        await page.goto(`${appUrls.home}items/1`);
        await expect(page.getByRole('heading', { name: 'Silk Evening Gown' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Availability' })).toBeVisible();
        await expect(page.locator('img[alt="Model wearing a champagne silk evening gown"]')).toBeVisible();
        const todayIso = new Date().toISOString().slice(0, 10);
        await expect(page.locator(`[title="${todayIso}"]`)).toBeVisible();
    });
});
