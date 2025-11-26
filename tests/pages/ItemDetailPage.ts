import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ItemDetailPage extends BasePage {
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly startDateInput: Locator;
    readonly endDateInput: Locator;
    readonly requestButton: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = page.locator('#name');
        this.emailInput = page.locator('#email');
        this.phoneInput = page.locator('#phone');
        this.startDateInput = page.locator('#start');
        this.endDateInput = page.locator('#end');
        this.requestButton = page.getByRole('button', { name: 'Request rental' });
    }

    async goto(itemId: number) {
        await super.goto(`items/${itemId}`);
    }

    async fillRentalForm(data: {
        name: string;
        email: string;
        phone: string;
        start: string;
        end: string;
    }) {
        await this.nameInput.fill(data.name);
        await this.emailInput.fill(data.email);
        await this.phoneInput.fill(data.phone);
        await this.startDateInput.fill(data.start);
        await this.endDateInput.fill(data.end);
    }

    async submitRental(itemId: number) {
        await Promise.all([
            this.page.waitForURL(new RegExp(`/items/${itemId}.*`), { 
                waitUntil: 'networkidle', 
                timeout: 10000 
            }),
            this.requestButton.click(),
        ]);
    }

    async submitRentalAndExpectSuccess(itemId: number) {
        await this.submitRental(itemId);
        await this.expectSuccessMessage();
    }

    async expectSuccessMessage() {
        const finalUrl = this.getCurrentUrl();
        if (!finalUrl.includes('success=1')) {
            // Dump page body for debugging
            const body = await this.page.locator('body').innerText();
            console.error('Expected success=1 in URL but got', finalUrl);
            console.error('Page body:', body.slice(0, 2000));
            
            // If dates are unavailable, throw more helpful error
            if (finalUrl.includes('unavailable=1')) {
                throw new Error('Rental dates are already booked. The test data generator may need adjustment to use more unique/distant dates.');
            }
        }
        expect(finalUrl).toContain('success=1');
    }

    async expectUnavailableMessage() {
        const finalUrl = this.getCurrentUrl();
        expect(finalUrl).toContain('unavailable=1');
    }

    async expectFormVisible() {
        await expect(this.nameInput).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.phoneInput).toBeVisible();
        await expect(this.startDateInput).toBeVisible();
        await expect(this.endDateInput).toBeVisible();
        await expect(this.requestButton).toBeVisible();
    }

    async expectFormNotVisible() {
        await expect(this.requestButton).not.toBeVisible();
    }
}

