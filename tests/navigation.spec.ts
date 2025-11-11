import { test, expect } from '@playwright/test';
import { appUrls } from './testData/urls';

test.describe('Navigation - Header accessibility', () => {
    test('header is visible on home page', async ({ page }) => {
        await page.goto(appUrls.home);
        await expect(page.getByRole('link', { name: 'GlamRent' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Browse' })).toBeVisible();
    });

    test('header is visible on catalog/search page', async ({ page }) => {
        await page.goto(`${appUrls.home}search`);
        await expect(page.getByRole('link', { name: 'GlamRent' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Browse' })).toBeVisible();
    });

    test('header is visible on item detail page', async ({ page }) => {
        await page.goto(`${appUrls.home}items/1`);
        await expect(page.getByRole('link', { name: 'GlamRent' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Browse' })).toBeVisible();
    });

    test('can navigate from catalog to home', async ({ page }) => {
        await page.goto(`${appUrls.home}search`);
        await page.getByRole('link', { name: 'GlamRent' }).click();
        await expect(page).toHaveURL(appUrls.home);
    });

    test('can navigate from item detail to catalog', async ({ page }) => {
        await page.goto(`${appUrls.home}items/1`);
        await page.getByRole('link', { name: 'Browse' }).click();
        await expect(page).toHaveURL(`${appUrls.home}search`);
    });

    test('can navigate from item detail to home', async ({ page }) => {
        await page.goto(`${appUrls.home}items/1`);
        await page.getByRole('link', { name: 'GlamRent' }).click();
        await expect(page).toHaveURL(appUrls.home);
    });

    test('all main navigation links are accessible within 3 clicks from catalog', async ({ page }) => {
        await page.goto(`${appUrls.home}search`);
        
        // Click 1: Go to home
        await page.getByRole('link', { name: 'GlamRent' }).click();
        await expect(page).toHaveURL(appUrls.home);
        
        // Click 2: Go back to catalog
        await page.getByRole('link', { name: 'Browse' }).click();
        await expect(page).toHaveURL(`${appUrls.home}search`);
        
        // Verify we can reach other sections within 3 clicks
        await page.getByRole('link', { name: 'GlamRent' }).click();
        await expect(page.getByRole('heading', { name: /Rent designer dresses/i })).toBeVisible();
    });
});
