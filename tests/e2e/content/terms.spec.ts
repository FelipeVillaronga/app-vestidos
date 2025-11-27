import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TermsPage } from '../../pages/TermsPage';

test.describe('Terms Page', () => {
    test('should display terms page with all sections', async ({ page }) => {
        const homePage = new HomePage(page);
        const termsPage = new TermsPage(page);

        await homePage.goto();
        await homePage.navigateToTerms();

        await termsPage.expectPageVisible();
        await termsPage.expectTermsSectionsVisible();
        await termsPage.expectLastUpdatedVisible();
    });
});

