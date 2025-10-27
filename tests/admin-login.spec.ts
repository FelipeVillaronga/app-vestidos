import { expect, test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { testUsers } from './testData/credentials';
//RF-005: Autenticación de Administrador
test.describe('RF-005 Login de Administrador', () => {
    test('debería iniciar sesión correctamente y luego cerrar sesión', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const adminDashboard = new AdminDashboardPage(page);
        await homePage.goto();
        await homePage.navigateToAdmin();
        await loginPage.login(testUsers.admin.username, testUsers.admin.password);
        await adminDashboard.expectDashboardVisible();
        await expect(page).toHaveURL(/.*admin/);
        await adminDashboard.signOut();
        await loginPage.expectLoginPageVisible();
    });
});
