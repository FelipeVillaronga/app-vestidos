import { Page } from '@playwright/test';
import { getCsrfToken } from './apiHelpers';
import { getDateString, createDateRange } from './dateHelpers';

/**
 * Creates a rental via API for testing purposes
 * @param page - Playwright page object
 * @param itemId - ID of the item to rent
 * @param customerData - Customer information
 * @param dates - Start and end dates in YYYY-MM-DD format
 * @returns The rental creation response
 */
export async function createTestRental(
    page: Page,
    itemId: number = 1,
    customerData: { name: string; email: string; phone: string } = {
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '+1234567890'
    },
    dates: { start: string; end: string } = createDateRange(7, 3)
) {
    // Navigate to the item page to get CSRF token
    await page.goto(`http://localhost:3000/items/${itemId}`);
    
    // Extract CSRF token from the page
    const csrf = await getCsrfToken(page);
    
    // Create rental via API
    const response = await page.request.post('http://localhost:3000/api/rentals', {
        form: {
            csrf,
            itemId: itemId.toString(),
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            start: dates.start,
            end: dates.end
        }
    });
    
    return response;
}

/**
 * Creates multiple test rentals
 * @param page - Playwright page object
 * @param count - Number of rentals to create
 * @returns Array of responses
 */
export async function createMultipleTestRentals(page: Page, count: number = 1) {
    const responses = [];
    for (let i = 0; i < count; i++) {
        const response = await createTestRental(
            page,
            1, // Use item ID 1 (Silk Evening Gown)
            {
                name: `Test Customer ${i + 1}`,
                email: `test${i + 1}@example.com`,
                phone: `+123456789${i}`
            },
            {
                start: getDateString(7 + (i * 14)),  // Stagger rentals by 2 weeks
                end: getDateString(10 + (i * 14))
            }
        );
        responses.push(response);
    }
    return responses;
}
