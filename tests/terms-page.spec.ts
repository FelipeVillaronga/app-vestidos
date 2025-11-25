import { test, expect } from '@playwright/test';
import { appUrls } from './testData/urls';
import { HomePage } from './pages/HomePage';
import { TermsPage } from './pages/TermsPage';

test.describe('CT-RF-009-01: Terms Page Visualization', () => {
    test('given_UserOnApp__when_SelectsTermsAndConditions__then_PageUrlIsTerms_And_ContentIsVisible', async ({ page }) => {
        const homePage = new HomePage(page);
        const termsPage = new TermsPage(page);

        // Given: User is on the landing page/dashboard
        await homePage.goto();
        await expect(page.getByRole('link', { name: 'GlamRent' })).toBeVisible();

        // When: User clicks the "Terms" option in the main menu (header navigation)
        await homePage.navigateToTerms();

        // Then: The system navigates to /terms
        await termsPage.expectPageVisible();

        // And: The page displays the Terms and Conditions content correctly
        // Verify the main heading is visible
        await expect(termsPage.mainHeading).toBeVisible();

        // Verify terms sections are present and not empty
        await termsPage.expectTermsSectionsVisible();
        
        // Verify the expected number of sections (10 sections)
        await termsPage.expectTermsSectionCount(10);
        
        // Verify specific section titles are visible
        await termsPage.expectSpecificSection('Purpose of Service');
        await termsPage.expectSpecificSection('Rental Requirements');
        await termsPage.expectSpecificSection('Reservations and Cancellations');
        await termsPage.expectSpecificSection('Delivery and Return');
        await termsPage.expectSpecificSection('Responsible Use of Garments');
        
        // Verify legal text content is visible (not empty)
        await termsPage.expectContentVisible('GlamRent offers rental services for dresses, shoes, and accessories');
        await termsPage.expectContentVisible('The user must be over 18 years of age');
        await termsPage.expectContentVisible('Reservations must be made at least 3 days in advance');
        
        // Verify "Last Updated" notice is visible
        await termsPage.expectLastUpdatedVisible();
    });
});
