import { chromium, FullConfig } from "@playwright/test";
import { config } from "./config";
import { logger } from "./logger";
import * as fs from "fs";
import * as path from "path";

const AUTH_FILE = path.resolve(process.cwd(), "src/data/authState.json");

async function globalSetup(playwrightConfig: FullConfig): Promise<void> {
  logger.info(`Running global setup for environment: ${config.environment}`);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    logger.info("Logging in to save auth state...");
    await page.goto(`${config.baseURL}/login`);
    await page.locator('[data-testid="username"]').fill(config.credentials.username);
    await page.locator('[data-testid="password"]').fill(config.credentials.password);
    await page.locator('[data-testid="login-button"]').click();
    await page.waitForURL("**/dashboard");

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
