import { expect } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async fill(selector, value) {
        await this.page.locator(selector).fill(value);
    }

    async click(selector) {
        await this.page.locator(selector).click();
    }

    async getText(selector) {
        return await this.page.locator(selector).textContent();
    }

    async expectToContainText(selector, text) {
        await expect(this.page.locator(selector)).toContainText(text);
    }
} 