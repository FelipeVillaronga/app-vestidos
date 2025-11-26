import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { FAQPage } from '../../pages/FAQPage';

test.describe('CT-RF-008-01: FAQ Visualization', () => {
    test('given_UserOnHomePage__when_NavigatesToFAQ__then_PageLoadsAndQuestionsAreVisible', async ({ page }) => {
        const homePage = new HomePage(page);
        const faqPage = new FAQPage(page);

        // Given: The user navigates to the application home page
        await homePage.goto();
        await expect(page.getByRole('link', { name: 'GlamRent' })).toBeVisible();

        // When: The user clicks the "FAQ" option in the main menu (header navigation)
        await homePage.navigateToFAQ();

        // Then: The FAQ page loads correctly
        await faqPage.expectPageVisible();

        // And: A list of frequently asked questions is visible to the user
        await faqPage.expectFAQsVisible();
        
        // Verify at least the expected number of FAQs are displayed
        await faqPage.expectFAQCount(6);
        
        // Verify specific FAQ questions are visible
        await faqPage.expectSpecificFAQ('How do I book a dress?');
        await faqPage.expectSpecificFAQ('How long can I keep the item?');
        await faqPage.expectSpecificFAQ('What happens if the item is damaged or not returned on time?');
        
        // Verify FAQ answers are visible
        await faqPage.expectAnswerVisible('To book a dress, simply browse the catalog');
        await faqPage.expectAnswerVisible('The standard rental period is 3 days');
    });
});

