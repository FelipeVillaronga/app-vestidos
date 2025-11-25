import { test, expect } from '@playwright/test';
import { appUrls } from './testData/urls';

// CT-RF-001-01 - Validar filtrado de vestidos por talle
test.describe('CT-RF-001-01 - Filtrado de vestidos por talle', () => {
    test('debe filtrar vestidos por talle M', async ({ page }) => {
        await page.goto(`${appUrls.home}search`);
        await page.waitForLoadState('networkidle');
        
        // Seleccionar categoría y talle
        const categorySelect = page.locator('select').nth(0);
        const sizeSelect = page.locator('select').nth(1);
        
        await categorySelect.selectOption('dress');
        await sizeSelect.selectOption('M');
        await page.click('button:has-text("Search")');
        
        // Esperar a que la URL cambie con los parámetros
        await page.waitForURL(/.*category=dress.*size=M.*/);
        
        // Verificar que la URL contiene los parámetros correctos
        expect(page.url()).toContain('category=dress');
        expect(page.url()).toContain('size=M');
        await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
    });
});

// CT-RF-001-02 - Validar filtrado de artículos por color
test.describe('CT-RF-001-02 - Filtrado de artículos por color', () => {
    test('debe filtrar artículos por color negro', async ({ page }) => {
        await page.goto(`${appUrls.home}search`);
        await page.waitForLoadState('networkidle');
        
        // Seleccionar color negro
        const colorSelect = page.locator('select').nth(2);
        await colorSelect.selectOption('black');
        await page.click('button:has-text("Search")');
        
        // Esperar a que la URL cambie con el parámetro de color
        await page.waitForURL(/.*color=black.*/);
        
        // Verificar que la URL contiene el parámetro de color
        expect(page.url()).toContain('color=black');
        await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
    });
});

// CT-RF-001-03 - Validar filtrado de artículos por estilo
test.describe('CT-RF-001-03 - Filtrado de artículos por estilo', () => {
    test('debe filtrar artículos por estilo evening', async ({ page }) => {
        await page.goto(`${appUrls.home}search`);
        await page.waitForLoadState('networkidle');
        
        // Seleccionar estilo evening
        const styleSelect = page.locator('select').nth(3);
        await styleSelect.selectOption('evening');
        await page.click('button:has-text("Search")');
        
        // Esperar a que la URL cambie con el parámetro de estilo
        await page.waitForURL(/.*style=evening.*/);
        
        // Verificar que la URL contiene el parámetro de estilo
        expect(page.url()).toContain('style=evening');
        await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
    });
});

// CT-RF-001-04 - Validar filtrado de calzados por talla
test.describe('CT-RF-001-04 - Filtrado de calzados por talla', () => {
    test('debe filtrar calzados por talla 38', async ({ page }) => {
        await page.goto(`${appUrls.home}search`);
        await page.waitForLoadState('networkidle');
        
        // Seleccionar categoría shoes y talla 38
        const categorySelect = page.locator('select').nth(0);
        const sizeSelect = page.locator('select').nth(1);
        
        await categorySelect.selectOption('shoes');
        await page.waitForTimeout(500); // Esperar a que se actualicen las opciones de talla
        
        await sizeSelect.selectOption('38');
        await page.click('button:has-text("Search")');
        
        // Esperar a que la URL cambie con los parámetros
        await page.waitForURL(/.*category=shoes.*size=38.*/);
        
        // Verificar que la URL contiene los parámetros correctos
        expect(page.url()).toContain('category=shoes');
        expect(page.url()).toContain('size=38');
        await expect(page.locator('h2').first()).toBeVisible();
    });
});

