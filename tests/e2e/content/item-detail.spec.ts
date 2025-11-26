import { test, expect } from '@playwright/test';
import { ItemDetailPage } from '../../pages/ItemDetailPage';
import { TEST_ITEMS } from '../../config/test.config';

test.describe('CT-RF-002-01 - Item detail', () => {
    test('displays images and availability calendar', async ({ page }) => {
        const itemDetailPage = new ItemDetailPage(page);
        
        await itemDetailPage.goto(TEST_ITEMS.defaultItemId);

        // Verify item details are visible
        await expect(page.getByRole('heading', { name: TEST_ITEMS.itemName })).toBeVisible({ timeout: 10000 });
        await expect(page.getByRole('heading', { name: 'Availability' })).toBeVisible();
        
        // Verify image is visible
        await expect(page.locator('img[alt="Model wearing a champagne silk evening gown"]')).toBeVisible();
        
        // Verify calendar shows today's date
        const todayIso = new Date().toISOString().slice(0, 10);
        await expect(page.locator(`[title="${todayIso}"]`)).toBeVisible();
    });
});

