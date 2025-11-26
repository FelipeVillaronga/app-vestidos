import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { AdminDashboardPage } from '../../pages/AdminDashboardPage';
import { testUsers } from '../../testData/credentials';

test.describe('RF-005 Admin Login Flow', () => {
    test('should successfully login and logout', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const adminDashboard = new AdminDashboardPage(page);

        await homePage.goto();
        await homePage.navigateToAdmin();

        await loginPage.expectLoginPageVisible();
        await loginPage.login(testUsers.admin.username, testUsers.admin.password);

        await adminDashboard.expectDashboardVisible();

        await adminDashboard.signOut();

        // After logout, we're redirected back to login page
        await page.waitForURL('**/admin/login', { waitUntil: 'networkidle' });
        await loginPage.expectLoginPageVisible();
    });
});

