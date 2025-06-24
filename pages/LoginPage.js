import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    // Private selectors
    #usernameInput = '[data-test="username"]';
    #passwordInput = '[data-test="password"]';
    #loginButton = '[data-test="login-button"]';
    #errorMessage = '[data-test="error"]';

    constructor(page) {
        super(page);
        this.url = 'https://www.saucedemo.com/';
    }

    async navigateToLogin() {
        await this.navigate(this.url);
    }

    async login(username, password) {
        await this.fill(this.#usernameInput, username);
        await this.fill(this.#passwordInput, password);
        await this.click(this.#loginButton);
    }

    async getErrorMessage() {
        return await this.getText(this.#errorMessage);
    }

    async expectErrorMessage(message) {
        await this.expectToContainText(this.#errorMessage, message);
    }
} 