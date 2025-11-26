import { test } from '@playwright/test';
import { ItemDetailPage } from '../../pages/ItemDetailPage';
import { RentalDataBuilder } from '../../testData/testDataBuilder';
import { TEST_ITEMS } from '../../config/test.config';

test('CT-RF-004 - Successful rental booking', async ({ page }) => {
    const itemDetailPage = new ItemDetailPage(page);
    const rentalData = new RentalDataBuilder().build();

    await itemDetailPage.goto(TEST_ITEMS.defaultItemId);
    await itemDetailPage.fillRentalForm(rentalData);
    await itemDetailPage.submitRentalAndExpectSuccess(TEST_ITEMS.defaultItemId);
});

