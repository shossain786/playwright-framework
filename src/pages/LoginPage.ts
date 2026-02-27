import { Page, Locator } from "@playwright/test"
import { BasePage } from "./BasePage"

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillInput(this.usernameInput, username);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }

    async loginWithDefaultCredentials(): Promise<void> {
        const { username, password } = (await import('@utils/config')).config.credentials;
        await this.login(username, password);
    }
}