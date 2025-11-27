import { test, expect } from '@playwright/test';
import { ItemDetailPage } from '../../pages/ItemDetailPage';
import { TEST_ITEMS } from '../../config/test.config';

test('CT-RF-004 - Empty required fields validation', async ({ page }) => {
    const itemDetailPage = new ItemDetailPage(page);

    await itemDetailPage.goto(TEST_ITEMS.defaultItemId);
    await itemDetailPage.expectFormVisible();

    // Try to submit with empty fields
    await itemDetailPage.requestButton.click();

    // Browser HTML5 validation should prevent submission
    // We expect to still be on the same page without success parameter
    expect(itemDetailPage.getCurrentUrl()).not.toContain('success=1');
    
    // Form should still be visible
    await itemDetailPage.expectFormVisible();
});

