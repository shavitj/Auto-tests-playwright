import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    // Private selectors
    #title = '[data-test="title"]';
    #sortDropdown = '[data-test="product-sort-container"]';
    #cartBadge = '[data-test="shopping-cart-badge"]';
    #cartLink = '[data-test="shopping-cart-link"]';
    #menuButton = 'button[id="react-burger-menu-btn"]';
    #logoutLink = '[data-test="logout-sidebar-link"]';

    constructor(page) {
        super(page);
    }

    async sortProducts(option) {
        await this.page.locator(this.#sortDropdown).selectOption(option);
    }

    async addToCart(productName) {
        await this.click(`[data-test="add-to-cart-${productName}"]`);
    }

    async getCartCount() {
        return await this.getText(this.#cartBadge);
    }

    async goToCart() {
        await this.click(this.#cartLink);
    }

    async logout() {
        await this.click(this.#menuButton);
        await this.click(this.#logoutLink);
    }

    async expectProductsTitle() {
        await this.expectToContainText(this.#title, 'Products');
    }
} 