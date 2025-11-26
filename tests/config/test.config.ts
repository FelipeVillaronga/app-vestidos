/**
 * Centralized test configuration
 */

export const TEST_CONFIG = {
    timeouts: {
        short: 5000,
        medium: 10000,
        long: 30000,
        veryLong: 60000,
    },
    urls: {
        base: process.env.BASE_URL || 'http://localhost:3000',
    },
    testData: {
        defaultRentalDuration: 3,
        futureBookingOffset: 365,
        workerBookingOffset: 7, // Days per worker to avoid conflicts
    },
    selectors: {
        timeout: 15000,
    },
} as const;

export const VIEWPORT = {
    desktop: { width: 1920, height: 1080 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 667 },
} as const;

export const TEST_ITEMS = {
    defaultItemId: 1,
    itemName: 'Silk Evening Gown',
} as const;

