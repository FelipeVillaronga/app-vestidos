import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchPage } from '../../pages/SearchPage';
import { ItemDetailPage } from '../../pages/ItemDetailPage';
import { appUrls } from '../../testData/urls';
import { TEST_ITEMS } from '../../config/test.config';

test.describe('Navigation - Header accessibility', () => {
    test('header is visible on home page', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        
        await expect(homePage.glamRentLink).toBeVisible();
        await expect(homePage.browseLink).toBeVisible();
    });

    test('header is visible on catalog/search page', async ({ page }) => {
        const searchPage = new SearchPage(page);
        await searchPage.goto();
        
        await expect(page.getByRole('link', { name: 'GlamRent' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Browse', exact: true })).toBeVisible();
    });

    test('header is visible on item detail page', async ({ page }) => {
        const itemDetailPage = new ItemDetailPage(page);
        await itemDetailPage.goto(TEST_ITEMS.defaultItemId);
        
        await expect(page.getByRole('link', { name: 'GlamRent' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Browse', exact: true })).toBeVisible();
    });

    test('can navigate from catalog to home', async ({ page }) => {
        const searchPage = new SearchPage(page);
        await searchPage.goto();
        
        await page.getByRole('link', { name: 'GlamRent' }).click();
        await expect(page).toHaveURL(appUrls.home);
    });

    test('can navigate from item detail to catalog', async ({ page }) => {
        const itemDetailPage = new ItemDetailPage(page);
        await itemDetailPage.goto(TEST_ITEMS.defaultItemId);
        
        await page.getByRole('link', { name: 'Browse', exact: true }).click();
        await expect(page).toHaveURL(`${appUrls.home}search`);
    });

    test('can navigate from item detail to home', async ({ page }) => {
        const itemDetailPage = new ItemDetailPage(page);
        await itemDetailPage.goto(TEST_ITEMS.defaultItemId);
        
        await page.getByRole('link', { name: 'GlamRent' }).click();
        await expect(page).toHaveURL(appUrls.home);
    });

    test('all main navigation links are accessible within 3 clicks from catalog', async ({ page }) => {
        const searchPage = new SearchPage(page);
        await searchPage.goto();

        // Click 1: Go to home
        await page.getByRole('link', { name: 'GlamRent' }).click();
        await expect(page).toHaveURL(appUrls.home);

        // Click 2: Go back to catalog
        await page.getByRole('link', { name: 'Browse', exact: true }).click();
        await expect(page).toHaveURL(`${appUrls.home}search`);

        // Verify we can reach other sections within 3 clicks
        await page.getByRole('link', { name: 'GlamRent' }).click();
        await expect(page.getByRole('heading', { name: /Rent designer dresses/i })).toBeVisible();
    });
});

