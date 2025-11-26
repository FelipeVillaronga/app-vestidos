import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly adminLink: Locator;
    readonly faqLink: Locator;
    readonly termsLink: Locator;
    readonly browseLink: Locator;
    readonly glamRentLink: Locator;

    constructor(page: Page) {
        super(page);
        this.adminLink = page.getByRole('link', { name: 'Admin' });
        this.faqLink = page.getByRole('navigation').getByRole('link', { name: 'FAQ' });
        this.termsLink = page.getByRole('navigation').getByRole('link', { name: 'Terms' });
        this.browseLink = page.getByRole('link', { name: 'Browse', exact: true });
        this.glamRentLink = page.getByRole('link', { name: 'GlamRent' });
    }

    async goto(): Promise<void> {
        await super.goto();
    }

    async navigateToAdmin(): Promise<void> {
        await this.adminLink.click();
    }

    async navigateToFAQ(): Promise<void> {
        await this.faqLink.click();
    }

    async navigateToTerms(): Promise<void> {
        await this.termsLink.click();
    }

    async navigateToBrowse(): Promise<void> {
        await this.browseLink.click();
    }
}
