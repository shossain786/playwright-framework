import { test, expect } from "@fixtures/index";
import { testData } from "@data/testData";
import { logger } from "@utils/logger";

test.describe("Login Feature", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
  });

  test("login should successful with valid credentials", async ({
    loginPage,
  }) => {
    logger.info("Starting valid login test");

    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password,
    );

    await loginPage.assertURL(process.env.BASE_URL || 'https://panjatan.netlify.app/');
    logger.info("Valid login test completed successfully");
  });

  test("should show error with invalid credentials", async ({ loginPage }) => {
    logger.info("Starting invalid login test");

    await loginPage.login(
      testData.invalidUser.username,
      testData.invalidUser.password,
    );

    await loginPage.assertErrorVisible();
    await loginPage.assertText(
      loginPage.errorMessage,
      testData.errorMessages.invalidCredentials,
    );
    logger.info("Invalid login test passed");
  });
});
