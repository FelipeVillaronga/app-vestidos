import { Page, expect } from '@playwright/test';
import { appUrls } from '../testData/urls';

export class BasePage {
    readonly page: Page;
    readonly baseUrl: string;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = appUrls.home;
    }

    async goto(path: string = '') {
        await this.page.goto(`${this.baseUrl}${path}`, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
    }

    async expectURL(url: string | RegExp) {
        await expect(this.page).toHaveURL(url);
    }

    async expectURLContains(text: string) {
        expect(this.page.url()).toContain(text);
    }

    async waitForNavigation(urlPattern: string | RegExp) {
        await this.page.waitForURL(urlPattern, { 
            waitUntil: 'domcontentloaded',
            timeout: 60000 
        });
    }

    async handleDialog(accept: boolean = true, expectedMessage?: string) {
        this.page.once('dialog', async (dialog) => {
            if (expectedMessage) {
                expect(dialog.message()).toContain(expectedMessage);
            }
            if (accept) {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });
    }

    async handleMultipleDialogs(accept: boolean = true) {
        this.page.on('dialog', async (dialog) => {
            if (accept) {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ 
            path: `test-results/screenshots/${name}-${Date.now()}.png`,
            fullPage: true 
        });
    }

    async waitForLoadState() {
        await this.page.waitForLoadState('networkidle');
    }

    getCurrentUrl(): string {
        return this.page.url();
    }
}

