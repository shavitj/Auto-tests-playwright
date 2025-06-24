import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    // Private selectors
    #title = '[data-test="title"]';
    #firstNameInput = '[data-test="firstName"]';
    #lastNameInput = '[data-test="lastName"]';
    #postalCodeInput = '[data-test="postalCode"]';
    #continueButton = '[data-test="continue"]';
    #finishButton = '[data-test="finish"]';
    #backButton = '[data-test="back-to-products"]';
    #completeHeader = '[data-test="complete-header"]';
    #ponyExpress = '[data-test="pony-express"]';
    #paymentInfo = '[data-test="payment-info-label"]';
    #totalInfo = '[data-test="total-info-label"]';

    constructor(page) {
        super(page);
    }

    async fillShippingInfo(firstName, lastName, postalCode) {
        await this.fill(this.#firstNameInput, firstName);
        await this.fill(this.#lastNameInput, lastName);
        await this.fill(this.#postalCodeInput, postalCode);
        await this.click(this.#continueButton);
    }

    async finishCheckout() {
        await this.click(this.#finishButton);
    }

    async backToProducts() {
        await this.click(this.#backButton);
    }

    async expectCheckoutTitle(step) {
        await this.expectToContainText(this.#title, `Checkout: ${step}`);
    }

    async expectOrderConfirmation() {
        await this.page.locator(this.#ponyExpress).isVisible();
        await this.expectToContainText(this.#completeHeader, 'Thank you for your order!');
    }

    async verifyOverviewPage() {
        await this.expectToContainText(this.#paymentInfo, 'Payment Information:');
        await this.expectToContainText(this.#totalInfo, 'Price Total');
    }
} 