import { Page, Locator, expect } from '@playwright/test';

export class TermsPage {
    readonly page: Page;
    readonly mainHeading: Locator;
    readonly termsSections: Locator;
    readonly lastUpdatedNotice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainHeading = page.getByRole('heading', { name: 'Terms & Conditions', level: 1 });
        this.termsSections = page.getByRole('heading', { level: 2 });
        this.lastUpdatedNotice = page.getByText('Last Updated');
    }

    async expectPageVisible() {
        await expect(this.page).toHaveURL(/.*\/terms/);
        await expect(this.mainHeading).toBeVisible();
    }

    async expectTermsSectionsVisible() {
        await expect(this.termsSections).not.toHaveCount(0);
    }

    async expectTermsSectionCount(count: number) {
        await expect(this.termsSections).toHaveCount(count);
    }

    async expectSpecificSection(sectionTitle: string) {
        const sectionHeading = this.page.getByRole('heading', { level: 2 }).filter({ hasText: sectionTitle });
        await expect(sectionHeading).toBeVisible();
    }

    async expectContentVisible(contentText: string) {
        await expect(this.page.getByText(contentText, { exact: false })).toBeVisible();
    }

    async expectLastUpdatedVisible() {
        await expect(this.lastUpdatedNotice).toBeVisible();
    }

    getTermsSectionByTitle(title: string): Locator {
        return this.page.locator('div').filter({ 
            has: this.page.getByRole('heading', { level: 2 }).filter({ hasText: title })
        });
    }
}
