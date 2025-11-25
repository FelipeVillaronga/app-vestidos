import { Page, Locator } from '@playwright/test';
import { appUrls } from '../testData/urls';

export class HomePage {
    readonly page: Page;
    readonly adminLink: Locator;
    readonly faqLink: Locator;
    readonly termsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminLink = page.getByRole('link', { name: 'Admin' });
        this.faqLink = page.getByRole('navigation').getByRole('link', { name: 'FAQ' });
        this.termsLink = page.getByRole('navigation').getByRole('link', { name: 'Terms' });
    }

    async goto() : Promise<void> {
        await this.page.goto(appUrls.home)
    }

    async navigateToAdmin() : Promise<void> {
        await this.adminLink.click();
    }

    async navigateToFAQ() : Promise<void> {
        await this.faqLink.click();
    }

    async navigateToTerms() : Promise<void> {
        await this.termsLink.click();
    }
}
