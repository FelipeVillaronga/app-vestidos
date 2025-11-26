import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminDashboardPage extends BasePage {
    readonly dashboardHeading: Locator;
    readonly signOutButton: Locator;
    readonly inventoryHeaderSection: Locator;
    readonly addItemButton: Locator;
    readonly inventoryTable: Locator;

    constructor(page: Page) {
        super(page);
        this.dashboardHeading = page.getByRole('heading', { name: 'Admin Dashboard' });
        this.signOutButton = page.getByRole('button', { name: 'Sign out' });
        this.inventoryHeaderSection = page.locator('#table-header');
        this.addItemButton = page.getByRole('button', { name: 'Add Item' });
        this.inventoryTable = page.locator('table');
    }

    async goto() {
        await super.goto('admin');
    }

    async expectDashboardVisible() {
        await expect(this.dashboardHeading).toBeVisible();
        await expect(this.signOutButton).toBeVisible();
    }

    async expectInventoryHeaders(headers: string[]) {
        await expect(this.inventoryHeaderSection).toBeVisible();
        for (const header of headers) {
            // Table headers are <th> elements, not using role="columnheader"
            await expect(
                this.inventoryHeaderSection.locator('th', { hasText: header })
            ).toBeVisible();
        }
    }

    async signOut() {
        await this.signOutButton.click();
    }

    async clickAddItem() {
        await this.addItemButton.click();
    }

    async getItemRow(itemName: string): Promise<Locator> {
        return this.inventoryTable.locator('tbody tr').filter({ hasText: itemName });
    }

    async expectItemVisible(itemName: string) {
        const row = await this.getItemRow(itemName);
        await expect(row).toBeVisible();
    }

    async clickEditItem(itemName: string) {
        const row = await this.getItemRow(itemName);
        const editButton = row.getByRole('button', { name: 'Edit' });
        await expect(editButton).toBeVisible();
        await editButton.click();
    }

    async clickDeleteItem(itemName: string) {
        const row = await this.getItemRow(itemName);
        const deleteButton = row.getByRole('button', { name: 'Delete' });
        await expect(deleteButton).toBeVisible();
        await deleteButton.click();
    }
}