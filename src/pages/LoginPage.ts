import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.loginButton = page.locator("#login-button");
  }

  async navigateToLogin(): Promise<void> {
    await this.navigate("login");
    await this.waitForPageLoad();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async loginWithDefaultCredentials(): Promise<void> {
    const { username, password } = (await import("@utils/config")).config
      .credentials;
    await this.login(username, password);
  }

  async assertErrorVisible(): Promise<void> {
    await this.assertVisible(this.errorMessage);
  }
}
