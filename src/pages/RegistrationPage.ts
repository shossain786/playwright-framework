import { Page, Locator } from "@playwright/test"
import { BasePage } from "./BasePage"

export class RegistrationPage extends BasePage {
    readonly firstName: Locator;
    readonly email: Locator;
    readonly country: Locator;
    readonly registerBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.locator("//input[@id='firstName']");
        this.email = page.getByLabel("Email:");
        this.country = page.locator("//select[@id='country']");
        this.registerBtn = page.locator("//input[@value='Register']");
    }

    async register(firstName: string, email: string, country: string) {
        await this.fillInput(this.firstName, firstName);
        await this.fillInput(this.email, email);
        await this.country.selectOption({ label: 'India'});
        await this.clickElement(this.registerBtn);
    }

}