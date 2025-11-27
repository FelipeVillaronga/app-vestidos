import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { AdminDashboardPage } from '../../pages/AdminDashboardPage';
import { testUsers } from '../../testData/credentials';

test('Admin Login - Successful login', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const adminDashboard = new AdminDashboardPage(page);

    await homePage.goto();
    await homePage.navigateToAdmin();

    await loginPage.expectLoginPageVisible();
    await loginPage.login(testUsers.admin.username, testUsers.admin.password);

    await adminDashboard.expectDashboardVisible();
});

