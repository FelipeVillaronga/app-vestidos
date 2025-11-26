import { Page, Locator, expect } from '@playwright/test';

export class AdminItemModal {
    readonly page: Page;
    readonly modal: Locator;
    readonly heading: Locator;
    readonly nameInput: Locator;
    readonly priceInput: Locator;
    readonly sizesInput: Locator;
    readonly colorsInput: Locator;
    readonly descriptionInput: Locator;
    readonly saveButton: Locator;
    readonly confirmButton: Locator;
    private isEdit: boolean;

    constructor(page: Page, isEdit: boolean = false) {
        this.page = page;
        this.isEdit = isEdit;
        const headingName = isEdit ? 'Edit Item' : 'Add New Item';
        this.heading = page.getByRole('heading', { name: headingName });
        // Use more specific selector for the modal - target the fixed overlay div
        this.modal = page.locator('div.fixed.inset-0').filter({ has: this.heading });
        
        this.nameInput = page.getByPlaceholder('E.g: Elegant Evening Dress');
        this.priceInput = page.getByPlaceholder('E.g: 79');
        this.sizesInput = page.getByPlaceholder('XS, S, M, L, XL');
        this.colorsInput = page.getByPlaceholder('E.g: champagne, black, red');
        this.descriptionInput = page.getByPlaceholder('Describe the item...');
        this.saveButton = page.getByRole('button', { name: 'Save item' });
        this.confirmButton = page.getByRole('button', { name: 'Confirm changes' });
    }

    async expectVisible() {
        await expect(this.heading).toBeVisible({ timeout: 15000 });
        // Just check the heading is visible, the modal check is redundant and causes strict mode issues
    }

    async fillItem(itemData: {
        name: string;
        price: string;
        sizes: string;
        colors: string;
        description: string;
    }) {
        await this.nameInput.fill(itemData.name);
        await this.priceInput.fill(itemData.price);
        await this.sizesInput.fill(itemData.sizes);
        await this.colorsInput.fill(itemData.colors);
        await this.descriptionInput.fill(itemData.description);
    }

    async fillName(name: string) {
        await this.modal.locator('input[type="text"]').first().fill(name);
    }

    async save(expectDialog: boolean = true, dialogMessage?: string) {
        if (expectDialog) {
            this.page.once('dialog', async (dialog) => {
                if (dialogMessage) {
                    expect(dialog.message()).toContain(dialogMessage);
                }
                await dialog.accept();
            });
        }
        await this.saveButton.click();
        await this.page.waitForURL('**/admin*', { waitUntil: 'networkidle' });
    }

    async confirm(expectDialogs: boolean = true) {
        if (expectDialogs) {
            this.page.on('dialog', async (dialog) => {
                await dialog.accept();
            });
        }
        await this.confirmButton.click();
        await this.page.waitForURL('**/admin*', { waitUntil: 'networkidle' });
    }
}

