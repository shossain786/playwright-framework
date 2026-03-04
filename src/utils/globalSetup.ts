import { chromium, FullConfig } from "@playwright/test";
import { config } from "./config";
import { logger } from "./logger";
import { LoginPage } from "../pages/LoginPage";
import * as fs from "fs";
import * as path from "path";

const AUTH_FILE = path.resolve(process.cwd(), "src/data/authState.json");

async function globalSetup(playwrightConfig: FullConfig): Promise<void> {
  logger.info(`Running global setup for environment: ${config.environment}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    logger.info("Logging in to save auth state...");
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(config.credentials.username, config.credentials.password);
    await page.waitForLoadState('networkidle');

    await context.storageState({ path: AUTH_FILE });
    logger.info(`Auth state saved to ${AUTH_FILE}`);
  } catch (error) {
    logger.error(`Global setup failed: ${error}`);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
