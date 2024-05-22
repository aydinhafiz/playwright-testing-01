import test from "@playwright/test";

const data = [
  {
    name: "B2C",
    email: "test-b2c-de@test.rameder.de",
    password: "test1234",
  },
  {
    name: "B2B",
    email: "test-b2c-de@test.rameder.de",
    password: "test1234",
  },
  {
    name: "B2T",
    email: "test-b2t-de@test.rameder.de",
    password: "test1234",
  },
];

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
      .fill(`${data[0].email}`);

    await loginDetails.nth(1).getByText("Passwort").fill(`${data[0].password}`); // password input

    await loginDetails.nth(3).getByRole("button", { name: "Anmelden" }).click(); // login button
  });

  test("login as B2B", async ({ page }) => {
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
      .fill(`${data[1].email}`);

    await loginDetails.nth(1).getByText("Passwort").fill(`${data[0].password}`); // password input

    await loginDetails.nth(3).getByRole("button", { name: "Anmelden" }).click(); // login button
  });

  test("login as B2T", async ({ page }) => {
    await page.locator(".inner .selection-buttons").getByText("Ja").click();

    

    await page
      .getByPlaceholder("muster@muster.com")
      .fill(`${data[2].password}`);
    await page.getByPlaceholder("******").fill(data[0].password);

    await page.getByRole("button", { name: "Jetzt anmelden" }).click();
  });
});
