import { test } from '../../fixtures/auth';
import { AdminDashboardPage } from '../../pages/AdminDashboardPage';

test('Admin Dashboard - Displays inventory headers', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const adminDashboard = new AdminDashboardPage(page);

    await adminDashboard.expectDashboardVisible();
    // Match actual table headers from the admin page
    await adminDashboard.expectInventoryHeaders(['ID', 'Name', 'Category', 'Sizes', 'Price/day', 'Actions']);
});

