/**
 * Date helper functions for tests
 */

/**
 * Gets a date string in YYYY-MM-DD format
 * @param daysFromNow - Number of days from today
 * @returns Date string in YYYY-MM-DD format
 */
export function getDateString(daysFromNow: number = 0): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
}

/**
 * Gets an ISO date with offset
 * @param days - Number of days from today
 * @returns Date string in YYYY-MM-DD format
 */
export function isoDateOffset(days: number): string {
    return getDateString(days);
}

/**
 * Gets a worker-specific date offset to avoid test conflicts
 * @param baseOffset - Base number of days from today
 * @returns Worker-specific offset
 */
export function getWorkerSpecificOffset(baseOffset: number = 365): number {
    const workerIndex = Number(
        process.env.PLAYWRIGHT_WORKER_INDEX ?? 
        process.env.PW_WORKER_INDEX ?? 
        0
    );
    return baseOffset + workerIndex * 7; // Each worker gets a different week
}

/**
 * Creates a date range for a rental
 * @param startOffset - Days from today for start date
 * @param duration - Duration in days
 * @returns Object with start and end date strings
 */
export function createDateRange(startOffset: number, duration: number = 3) {
    return {
        start: getDateString(startOffset),
        end: getDateString(startOffset + duration),
    };
}

/**
 * Creates a worker-specific date range to avoid conflicts in parallel tests
 * @param baseOffset - Base offset from today
 * @param duration - Duration in days
 * @returns Object with start and end date strings
 */
export function createWorkerSpecificDateRange(baseOffset: number = 365, duration: number = 3) {
    const offset = getWorkerSpecificOffset(baseOffset);
    return createDateRange(offset, duration);
}

