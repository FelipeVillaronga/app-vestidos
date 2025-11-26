import { test } from '../../fixtures/auth';
import { AdminDashboardPage } from '../../pages/AdminDashboardPage';
import { RentalsManagementPage } from '../../pages/RentalsManagementPage';
import { createTestRental } from '../../helpers/rentalHelpers';
import { RentalDataBuilder } from '../../testData/testDataBuilder';
import { TEST_ITEMS } from '../../config/test.config';

test('Admin - Cancel Rental', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const adminDashboard = new AdminDashboardPage(page);
    const rentalsPage = new RentalsManagementPage(page);

    // Create a test rental first
    const rentalData = new RentalDataBuilder()
        .withName('Cancel Test Customer')
        .withEmail('cancel-test@example.com')
        .withPhone('+1234567999')
        .withDates(30, 33)
        .build();

    await createTestRental(page, TEST_ITEMS.defaultItemId, rentalData, {
        start: rentalData.start,
        end: rentalData.end
    });

    // Navigate to admin dashboard (use longer timeout for slower browsers)
    await page.goto(`${page.url().split('/items/')[0]}/admin`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('load', { timeout: 15000 });
    await adminDashboard.expectDashboardVisible();

    // Find and verify the rental
    await rentalsPage.expectRentalsSectionVisible();
    const rentalRow = rentalsPage.getActiveRentalRow(0);
    const rentalId = await rentalsPage.getRentalId(rentalRow);
    await rentalsPage.expectRentalStatusToBe(rentalRow, 'Active');

    // Cancel the rental
    await rentalsPage.cancelRental(rentalRow);
    await rentalsPage.expectSuccessMessage();

    // Verify the rental is now canceled
    const canceledRow = rentalsPage.getRentalRowById(rentalId);
    await rentalsPage.expectRentalStatusToBe(canceledRow, 'Canceled');
    await rentalsPage.expectCancelButtonNotVisible(canceledRow);
});

