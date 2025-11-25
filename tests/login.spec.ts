import { test, expect } from '@playwright/test';
import { testUsers } from './testData/credentials';
import { appUrls } from './testData/urls';

test.describe('RF-005 Admin Login Flow', () => {
    test('should successfully login and logout', async ({ page }) => {
        await page.goto(appUrls.home);
        await page.getByRole('link', { name: 'Admin' }).click();

        await page.getByRole('textbox', { name: 'Username' }).fill(testUsers.admin.username);
        await page.getByRole('textbox', { name: 'Password' }).fill(testUsers.admin.password);
        await page.getByRole('button', { name: /sign in/i }).click();

        await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();

        await page.getByRole('button', { name: 'Sign out' }).click();
        await expect(page.getByRole('heading', { name: 'Admin Portal' })).toBeVisible();
    });
});