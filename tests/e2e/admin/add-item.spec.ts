import { test } from '../../fixtures/auth';
import { AdminDashboardPage } from '../../pages/AdminDashboardPage';
import { AdminItemModal } from '../../pages/AdminItemModal';
import { ItemDataBuilder } from '../../testData/testDataBuilder';

test('Admin - Add Item', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const adminDashboard = new AdminDashboardPage(page);
    const itemData = new ItemDataBuilder()
        .withUniquePrefix('Playwright Test Dress')
        .withPrice('49')
        .withSizes('S, M')
        .withColors('black')
        .withDescription('Prueba básica de Playwright - añadir ítem')
        .build();

    await adminDashboard.expectDashboardVisible();
    await adminDashboard.clickAddItem();

    const addModal = new AdminItemModal(page, false);
    await addModal.expectVisible();
    await addModal.fillItem(itemData);
    await addModal.save(true, 'Item added successfully');

    await adminDashboard.expectItemVisible(itemData.name);
});

