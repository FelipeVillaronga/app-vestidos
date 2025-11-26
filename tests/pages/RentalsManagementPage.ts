import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RentalsManagementPage extends BasePage {
    readonly rentalsSection: Locator;
    readonly rentalsHeading: Locator;
    readonly rentalsTable: Locator;

    constructor(page: Page) {
        super(page);
        this.rentalsHeading = page.getByRole('heading', { name: 'Scheduled Rentals' });
        this.rentalsSection = page.locator('section').filter({ has: this.rentalsHeading });
        this.rentalsTable = this.rentalsSection.locator('table');
    }

    async expectRentalsSectionVisible() {
        await expect(this.rentalsSection).toBeVisible();
    }

    getActiveRentalRow(index: number = 0) {
        return this.rentalsTable.locator('tbody tr').filter({ hasText: 'Active' }).nth(index);
    }

    getCanceledRentalRow(index: number = 0) {
        return this.rentalsTable.locator('tbody tr').filter({ hasText: 'Canceled' }).nth(index);
    }

    getRentalRowById(rentalIdText: string) {
        return this.rentalsTable.locator('tbody tr').filter({ 
            has: this.page.locator('code', { hasText: rentalIdText }) 
        }).first();
    }

    async getRentalId(row: Locator): Promise<string> {
        const rentalIdElement = row.locator('code').first();
        const text = await rentalIdElement.textContent();
        return text || '';
    }

    async cancelRental(row: Locator) {
        const cancelButton = row.getByRole('button', { name: 'Cancel' });
        await expect(cancelButton).toBeVisible();
        
        // Click cancel and wait for redirect with success message
        await cancelButton.click();
        await this.page.waitForURL('**/admin?rental=success', { waitUntil: 'networkidle' });
    }
    
    async expectSuccessMessage() {
        const successMessage = this.page.locator('div.rounded-xl.bg-green-50').filter({ hasText: 'Rental canceled successfully!' });
        await expect(successMessage).toBeVisible();
    }

    async expectRentalStatusToBe(row: Locator, status: 'Active' | 'Canceled') {
        const statusBadge = row.locator('span').filter({ hasText: status });
        await expect(statusBadge).toBeVisible();
    }

    async expectCancelButtonNotVisible(row: Locator) {
        const actionCell = row.locator('td').last();
        await expect(actionCell.getByText('—')).toBeVisible();
        await expect(actionCell.getByRole('button', { name: 'Cancel' })).not.toBeVisible();
    }
}
