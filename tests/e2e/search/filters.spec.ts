import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';

test.describe('Search Filters - CT-RF-001', () => {
    let searchPage: SearchPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        await searchPage.goto();
    });

    test('CT-RF-001-01 - Filter dresses by size M', async ({ page }) => {
        // Select size "M"
        await searchPage.filterBySize('M');
        
        // Click search button
        await searchPage.search();
        
        // Wait for network to be idle (results loaded)
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        
        // Verify results heading is visible
        await searchPage.expectResultsVisible();
        
        // Verify all visible items include size M
        const sizeElements = page.locator('p:has-text("Sizes:")');
        const count = await sizeElements.count();
        expect(count).toBeGreaterThan(0);
        
        for (let i = 0; i < count; i++) {
            await expect(sizeElements.nth(i)).toContainText('M');
        }
    });

    test('CT-RF-001-02 - Filter items by black color', async ({ page }) => {
        // Select color "black"
        await searchPage.filterByColor('black');
        
        // Click search button
        await searchPage.search();
        
        // Wait for network to be idle (results loaded)
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        
        // Verify results heading is visible
        await searchPage.expectResultsVisible();
        
        // Verify all visible items include black color
        const colorElements = page.locator('p:has-text("Color:")');
        const count = await colorElements.count();
        expect(count).toBeGreaterThan(0);
        
        for (let i = 0; i < count; i++) {
            await expect(colorElements.nth(i)).toContainText('Black');
        }
    });

    test('CT-RF-001-03 - Filter items by evening style', async ({ page }) => {
        // Select style "evening"
        await searchPage.filterByStyle('evening');
        
        // Click search button
        await searchPage.search();
        
        // Wait for network to be idle (results loaded)
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        
        // Verify results heading is visible
        await searchPage.expectResultsVisible();
        
        // Verify filtered results are present
        const itemCards = page.locator('h3');
        const count = await itemCards.count();
        expect(count).toBeGreaterThan(0);
    });

    test('CT-RF-001-04 - Filter shoes by size 38', async ({ page }) => {
        // Navigate directly with both filters via URL
        await page.goto('/search?category=shoes&size=38');
        await page.waitForLoadState('domcontentloaded');
        
        // Wait for network to be idle
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        
        // Verify URL contains filters
        expect(page.url()).toContain('category=shoes');
        expect(page.url()).toContain('size=38');
        
        // Verify the dropdowns reflect the URL parameters
        await expect(page.locator('select').nth(0)).toHaveValue('shoes');
        await expect(page.locator('select').nth(1)).toHaveValue('38');
        
        // Verify results heading is visible
        await searchPage.expectResultsVisible();
    });
});
