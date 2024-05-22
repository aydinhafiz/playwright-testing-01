import test from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.rameder.de");
  await page.getByText("Ich stimme zu").click();
});

test.describe("success login with 3 accounts", () => {
  test("login as B2C", async ({ page }) => {
    await page.locator(".inner .selection-buttons").getByText("Nein").click();

    await page // click the button
      .locator(".navigation-user .nav-account .nav-account-item")
      .getByText("Anmelden")
      .click();

    const loginDetails = await page // define a variable to avoid same code
      .locator(".top")
      .locator("form")
      .locator(".form-line");

    await loginDetails // email input
      .first()
      .locator("#email")
      .fill("test-b2c-de@test.rameder.de");

    await loginDetails.nth(1).getByText("Passwort").fill("test1234"); // password input

    await loginDetails.nth(3).getByRole("button", { name: "Anmelden" }).click(); // login button
  });
});
