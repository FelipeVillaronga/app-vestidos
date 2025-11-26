import { test, expect } from '@playwright/test';

test.describe('Search Filters - CT-RF-001', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/search');
        await page.waitForLoadState('domcontentloaded');
    });

    test('CT-RF-001-01 - Filter dresses by size M', async ({ page }) => {
        // Select category "dress" (first select)
        await page.locator('select').nth(0).selectOption('Dresses');
        
        // Wait for size dropdown to update
        await page.waitForTimeout(300);
        
        // Select size "M" (second select)
        await page.locator('select').nth(1).selectOption('M');
        
        // Click search button
        await page.getByRole('button', { name: 'Search' }).click();
        
        // Wait for URL to update
        await page.waitForURL('**/search?**', { timeout: 5000 });
        
        // Verify URL contains filters
        expect(page.url()).toContain('category=dress');
        expect(page.url()).toContain('size=M');
        
        // Verify results heading is visible
        await expect(page.locator('h2').filter({ hasText: /Found/i })).toBeVisible();
    });

    test('CT-RF-001-02 - Filter items by black color', async ({ page }) => {
        // Wait for color dropdown to populate from API
        await page.waitForTimeout(1000);
        
        // Select color "black" (third select)
        await page.locator('select').nth(2).selectOption('black');
        
        // Click search button
        await page.getByRole('button', { name: 'Search' }).click();
        
        // Wait for URL to update
        await page.waitForURL('**/search?**', { timeout: 5000 });
        
        // Verify URL contains filter
        expect(page.url()).toContain('color=black');
        
        // Verify results heading is visible
        await expect(page.locator('h2').filter({ hasText: /found/i })).toBeVisible();
    });

    test('CT-RF-001-03 - Filter items by evening style', async ({ page }) => {
        // Wait for style dropdown to populate from API
        await page.waitForTimeout(1000);
        
        // Select style "evening" (fourth select)
        await page.locator('select').nth(3).selectOption('evening');
        
        // Click search button
        await page.getByRole('button', { name: 'Search' }).click();
        
        // Wait for URL to update
        await page.waitForURL('**/search?**', { timeout: 5000 });
        
        // Verify URL contains filter
        expect(page.url()).toContain('style=evening');
        
        // Verify results heading is visible
        await expect(page.locator('h2').filter({ hasText: /found/i })).toBeVisible();
    });

    test('CT-RF-001-04 - Filter shoes by size 38', async ({ page }) => {
        // Select category "shoes" (first select)
        await page.locator('select').nth(0).selectOption('shoes');
        
        // Wait for size dropdown to update to show numeric sizes
        await page.waitForTimeout(300);
        
        // Select size "38" (second select)
        await page.locator('select').nth(1).selectOption('38');
        
        // Click search button
        await page.getByRole('button', { name: 'Search' }).click();
        
        // Wait for URL to update
        await page.waitForURL('**/search?**', { timeout: 5000 });
        
        // Verify URL contains filters
        expect(page.url()).toContain('category=shoes');
        expect(page.url()).toContain('size=38');
        
        // Verify results heading is visible
        await expect(page.locator('h2').filter({ hasText: /found/i })).toBeVisible();
    });
});
