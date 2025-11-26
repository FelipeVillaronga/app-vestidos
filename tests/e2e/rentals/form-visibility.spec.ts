import { test } from '@playwright/test';
import { ItemDetailPage } from '../../pages/ItemDetailPage';
import { TEST_ITEMS } from '../../config/test.config';

test('CT-RF-004 - Rental form is visible on item detail page', async ({ page }) => {
    const itemDetailPage = new ItemDetailPage(page);

    await itemDetailPage.goto(TEST_ITEMS.defaultItemId);
    await itemDetailPage.expectFormVisible();
});

