/**
 * Builder pattern for creating test data
 */

export class RentalDataBuilder {
    private data: {
        name: string;
        email: string;
        phone: string;
        start: string;
        end: string;
    };

    constructor() {
        // Use far-future dates to avoid conflicts with other tests
        // Use a worker-specific offset + unique seconds-based offset
        const workerIndex = Number(process.env.PLAYWRIGHT_WORKER_INDEX ?? process.env.PW_WORKER_INDEX ?? 0);
        // Start ~2 years in future + worker offset + seconds-based uniqueness (max ~11 days)
        const uniqueOffset = Math.floor((Date.now() / 1000) % 1000); // 0-999 seconds (~16 min cycle)
        const baseOffset = 730 + (workerIndex * 30) + uniqueOffset; // Each worker gets 30 days apart + unique offset
        
        this.data = {
            name: `Tester W${workerIndex}-${uniqueOffset}`,
            email: `tester+${workerIndex}-${uniqueOffset}@example.com`,
            phone: `+3412345${(10000 + workerIndex).toString().slice(-6)}`,
            start: this.getDateString(baseOffset),
            end: this.getDateString(baseOffset + 1),
        };
    }

    withName(name: string): this {
        this.data.name = name;
        return this;
    }

    withEmail(email: string): this {
        this.data.email = email;
        return this;
    }

    withPhone(phone: string): this {
        this.data.phone = phone;
        return this;
    }

    withDates(startOffset: number, endOffset: number): this {
        this.data.start = this.getDateString(startOffset);
        this.data.end = this.getDateString(endOffset);
        return this;
    }

    withStartDate(startOffset: number): this {
        this.data.start = this.getDateString(startOffset);
        return this;
    }

    withEndDate(endOffset: number): this {
        this.data.end = this.getDateString(endOffset);
        return this;
    }

    withRawDates(start: string, end: string): this {
        this.data.start = start;
        this.data.end = end;
        return this;
    }

    build() {
        return { ...this.data };
    }

    private getDateString(daysFromNow: number): string {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0];
    }
}

export class ItemDataBuilder {
    private data: {
        name: string;
        price: string;
        sizes: string;
        colors: string;
        description: string;
    };

    constructor() {
        const timestamp = Date.now();
        this.data = {
            name: `Test Item ${timestamp}`,
            price: '49',
            sizes: 'S, M, L',
            colors: 'black, red',
            description: 'Test item description',
        };
    }

    withName(name: string): this {
        this.data.name = name;
        return this;
    }

    withPrice(price: string | number): this {
        this.data.price = price.toString();
        return this;
    }

    withSizes(sizes: string): this {
        this.data.sizes = sizes;
        return this;
    }

    withColors(colors: string): this {
        this.data.colors = colors;
        return this;
    }

    withDescription(description: string): this {
        this.data.description = description;
        return this;
    }

    withUniquePrefix(prefix: string): this {
        this.data.name = `${prefix} ${Date.now()}`;
        return this;
    }

    build() {
        return { ...this.data };
    }
}

export class FilterDataBuilder {
    private data: {
        category?: string;
        size?: string;
        color?: string;
        style?: string;
    };

    constructor() {
        this.data = {};
    }

    withCategory(category: string): this {
        this.data.category = category;
        return this;
    }

    withSize(size: string): this {
        this.data.size = size;
        return this;
    }

    withColor(color: string): this {
        this.data.color = color;
        return this;
    }

    withStyle(style: string): this {
        this.data.style = style;
        return this;
    }

    build() {
        return { ...this.data };
    }
}

/**
 * Helper function to get a date string in YYYY-MM-DD format
 */
export function getDateString(daysFromNow: number = 0): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
}

/**
 * Helper function to get ISO date with offset
 */
export function isoDateOffset(days: number): string {
    return getDateString(days);
}

