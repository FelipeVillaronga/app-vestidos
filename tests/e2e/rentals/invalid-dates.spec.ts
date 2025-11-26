import { test, expect } from '@playwright/test';
import { ItemDetailPage } from '../../pages/ItemDetailPage';
import { RentalDataBuilder } from '../../testData/testDataBuilder';
import { getDateString } from '../../helpers/dateHelpers';
import { TEST_ITEMS } from '../../config/test.config';

test.describe('CT-RF-004 - Invalid Dates Validation', () => {
    let itemDetailPage: ItemDetailPage;

    test.beforeEach(async ({ page }) => {
        itemDetailPage = new ItemDetailPage(page);
        await itemDetailPage.goto(TEST_ITEMS.defaultItemId);
    });

    test('End date before start date should fail', async () => {
        const rentalData = new RentalDataBuilder()
            .withRawDates(getDateString(10), getDateString(5))
            .build();

        await itemDetailPage.fillRentalForm(rentalData);
        await itemDetailPage.requestButton.click();

        // Should not redirect to success
        expect(itemDetailPage.getCurrentUrl()).not.toContain('success=1');
    });

    test('Past dates should fail', async () => {
        const rentalData = new RentalDataBuilder()
            .withRawDates(getDateString(-10), getDateString(-5))
            .build();

        await itemDetailPage.fillRentalForm(rentalData);
        await itemDetailPage.requestButton.click();

        // Should not redirect to success
        expect(itemDetailPage.getCurrentUrl()).not.toContain('success=1');
    });
});

