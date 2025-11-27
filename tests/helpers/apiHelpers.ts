import { APIRequestContext, Page } from '@playwright/test';

/**
 * Helper class for API operations in tests
 */
export class APIHelper {
    constructor(private request: APIRequestContext) {}

    async createRental(data: {
        itemId: number;
        name: string;
        email: string;
        phone: string;
        start: string;
        end: string;
        csrf: string;
    }) {
        return await this.request.post('/api/rentals', {
            form: {
                csrf: data.csrf,
                itemId: data.itemId.toString(),
                name: data.name,
                email: data.email,
                phone: data.phone,
                start: data.start,
                end: data.end,
            }
        });
    }

    async deleteItem(itemId: number, csrf: string) {
        return await this.request.delete(`/api/admin/items/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: { csrf }
        });
    }

    async login(username: string, password: string) {
        return await this.request.post('/api/admin/login', {
            form: { username, password }
        });
    }
}

/**
 * Extract CSRF token from a page
 */
export async function getCsrfToken(page: Page): Promise<string> {
    const csrfInput = page.locator('input[name="csrf"]').first();
    const csrf = await csrfInput.getAttribute('value');
    
    if (!csrf) {
        throw new Error('CSRF token not found on page');
    }
    
    return csrf;
}

