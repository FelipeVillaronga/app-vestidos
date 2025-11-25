import { Page, Locator, expect } from '@playwright/test';

export class FAQPage {
    readonly page: Page;
    readonly mainHeading: Locator;
    readonly faqQuestions: Locator;
    readonly contactUsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainHeading = page.getByRole('heading', { name: 'Frequently Asked Questions', level: 1 });
        this.faqQuestions = page.getByRole('heading', { level: 2 });
        this.contactUsButton = page.getByRole('link', { name: 'Contact Us' });
    }

    async expectPageVisible() {
        await expect(this.page).toHaveURL(/.*\/faq/);
        await expect(this.mainHeading).toBeVisible();
    }

    async expectFAQsVisible() {
        await expect(this.faqQuestions).not.toHaveCount(0);
    }

    async expectFAQCount(count: number) {
        await expect(this.faqQuestions).toHaveCount(count);
    }

    async expectSpecificFAQ(question: string) {
        const faqHeading = this.page.getByRole('heading', { name: question, level: 2 });
        await expect(faqHeading).toBeVisible();
    }

    async expectAnswerVisible(answerText: string) {
        await expect(this.page.getByText(answerText, { exact: false })).toBeVisible();
    }

    getFAQByQuestion(question: string): Locator {
        return this.page.locator('div').filter({ 
            has: this.page.getByRole('heading', { name: question, level: 2 }) 
        });
    }
}
