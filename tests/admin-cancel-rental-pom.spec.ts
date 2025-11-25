import { test, expect } from './fixtures/auth';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { RentalsManagementPage } from './pages/RentalsManagementPage';
import { createTestRental } from './helpers/rentalHelpers';

test.describe('RF-XXX: Cancelación de Alquiler por Administrador', () => {
    test('given_AdminUser__when_CancelsActiveRental__then_StatusIsCancelled_And_MessageShown', async ({ loggedInPage }) => {
        const page = loggedInPage;
        const admin = new AdminDashboardPage(page);
        const rentalsPage = new RentalsManagementPage(page);

        // Given: User logs in as Administrator
        await admin.expectDashboardVisible();

        // And: Create a test rental to ensure at least one active rental exists
        await createTestRental(page);

        // And: Navigate to Rental Management Panel
        await page.goto('http://localhost:3000/admin');
        await admin.expectDashboardVisible();
        await rentalsPage.expectRentalsSectionVisible();

        // And: Identifies an active rental in the list
        const activeRentalRow = rentalsPage.getActiveRentalRow(0);
        await expect(activeRentalRow).toBeVisible({ timeout: 10000 });
        
        // Extract rental ID for verification
        const rentalId = await rentalsPage.getRentalId(activeRentalRow);

        // When: Selects the rental and clicks "Cancel"
        // And: Confirms the action in the modal/popup (if applicable)
        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toBe('confirm');
            await dialog.accept();
        });
        
        await rentalsPage.cancelRental(activeRentalRow);

        // Then: Verify that a success confirmation message is visible
        await rentalsPage.expectSuccessMessage();

        // And: Verify that the rental status changes to "Canceled"
        const updatedRentalRow = rentalsPage.getRentalRowById(rentalId);
        await rentalsPage.expectRentalStatusToBe(updatedRentalRow, 'Canceled');

        // And: Verify that the Cancel button is no longer available
        await rentalsPage.expectCancelButtonNotVisible(updatedRentalRow);
    });
});
