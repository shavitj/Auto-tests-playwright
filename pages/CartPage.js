import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    // Private selectors
    #title = '[data-test="title"]';
    #checkoutButton = '[data-test="checkout"]';

    constructor(page) {
        super(page);
    }

    async proceedToCheckout() {
        await this.click(this.#checkoutButton);
    }

    async expectCartTitle() {
        await this.expectToContainText(this.#title, 'Your Cart');
    }
} 