import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
    readonly categorySelect: Locator;
    readonly sizeSelect: Locator;
    readonly colorSelect: Locator;
    readonly styleSelect: Locator;
    readonly searchButton: Locator;
    readonly resultsHeading: Locator;

    constructor(page: Page) {
        super(page);
        this.categorySelect = page.locator('select').nth(0);
        this.sizeSelect = page.locator('select').nth(1);
        this.colorSelect = page.locator('select').nth(2);
        this.styleSelect = page.locator('select').nth(3);
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resultsHeading = page.getByRole('heading', { level: 2 });
    }

    async goto() {
        await super.goto('search');
    }

    async filterByCategory(category: string) {
        // Use evaluate to directly change the value and trigger the change event
        // This ensures React's onChange handler is properly triggered
        await this.page.evaluate((cat) => {
            const select = document.querySelectorAll('select')[0] as HTMLSelectElement;
            if (select) {
                select.value = cat;
                const event = new Event('change', { bubbles: true });
                select.dispatchEvent(event);
            }
        }, category);
        
        // Wait for React to finish re-rendering
        await this.page.waitForTimeout(500);
    }

    async filterBySize(size: string) {
        // Wait for the size dropdown to have the correct options for the selected category
        await this.page.waitForFunction(
            (targetSize) => {
                const sizeSelect = document.querySelectorAll('select')[1] as HTMLSelectElement;
                if (!sizeSelect) return false;
                
                // Check if the size option exists
                const hasOption = Array.from(sizeSelect.options).some(opt => opt.value === targetSize);
                return hasOption;
            },
            size,
            { timeout: 15000 }
        );
        
        // Use evaluate to directly change the value and trigger the change event
        await this.page.evaluate((sz) => {
            const select = document.querySelectorAll('select')[1] as HTMLSelectElement;
            if (select) {
                select.value = sz;
                const event = new Event('change', { bubbles: true });
                select.dispatchEvent(event);
            }
        }, size);
    }

    async filterByColor(color: string) {
        await this.colorSelect.selectOption(color);
    }

    async filterByStyle(style: string) {
        await this.styleSelect.selectOption(style);
    }

    async search() {
        await this.searchButton.click();
    }

    async searchWithFilters(filters: {
        category?: string;
        size?: string;
        color?: string;
        style?: string;
    }) {
        if (filters.category) await this.filterByCategory(filters.category);
        if (filters.size) await this.filterBySize(filters.size);
        if (filters.color) await this.filterByColor(filters.color);
        if (filters.style) await this.filterByStyle(filters.style);
        
        await this.search();
    }

    async expectURLContainsParams(params: Record<string, string>) {
        // Build expected URL pattern
        const urlPattern = Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('.*');
        
        await this.page.waitForURL(new RegExp(urlPattern), {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
        
        // Verify each parameter individually
        for (const [key, value] of Object.entries(params)) {
            this.expectURLContains(`${key}=${value}`);
        }
    }

    async expectResultsVisible() {
        await expect(this.resultsHeading).toBeVisible();
    }

    async expectFirstResultVisible() {
        await expect(this.page.locator('h2').first()).toBeVisible();
    }
}

