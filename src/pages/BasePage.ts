import { Page, Locator, expect } from '@playwright/test'
import { config } from '@utils/config'

export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate(path:string = ''): Promise<void> {
        await this.page.goto(`${config.baseURL.replace(/\/$/, '')}/${path}`)
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded')
    }

    async getTitle(): Promise<string> {
        return await this.page.title()
    }

    async waitForElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: config.timeouts.element })
    }

    async clickElement(locator: Locator): Promise<void> {
        await this.waitForElement(locator)
        await locator.click()
    }

    async fillInput(locator: Locator, value: string): Promise<void> {
        await this.waitForElement(locator)
        await locator.clear()
        await locator.fill(value)
    }

    async getText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    return locator.innerText();
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async assertVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async assertText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  async assertURL(expectedURL: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedURL);
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `reports/${name}.png`, fullPage: true });
  }
}