import { expect, test } from "@playwright/test";

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
  await expect(page.url()).toBe("https://www.rameder.de/"); // validate it
  await page.getByText("Ich stimme zu").click();
});

test.describe("success login with 3 accounts", () => {
  test("login as B2C", async ({ page }) => {
    const geschaeftsKundeAlert = await page
      .locator(".inner .selection-buttons")
      .getByText("Nein");

    expect(geschaeftsKundeAlert).toHaveText("Nein"); // validate it
    geschaeftsKundeAlert.click(); // click no

    const Login = await page
      .locator(".navigation-user .nav-account .nav-account-item")
      .getByText("Anmelden"); // find the button

    expect(Login).toHaveText("Anmelden"); // validate it
    Login.click(); // click the button

    const loginDetails = await page // define a variable to avoid same code
      .locator(".top")
      .locator("form")
      .locator(".form-line");

    const emailInput = await loginDetails // email input
      .first()
      .locator("#email");

    await emailInput.fill(`${data[1].email}`); // write email
    expect(emailInput).toHaveValue(`${data[0].email}`); // validate it

    const passwordInput = await loginDetails.nth(1).getByText("Passwort");
    // password input

    await passwordInput.fill(`${data[0].password}`);
    expect(passwordInput).toHaveValue(`${data[0].password}`);

    const loginButton = await loginDetails
      .nth(3)
      .getByRole("button", { name: "Anmelden" }); // login button
    expect(loginButton).toHaveText("Anmelden"); // validate it
    await loginButton.click(); // click the button
  });

  test("login as B2B", async ({ page }) => {
    const geschaeftsKundeAlert = await page
      .locator(".inner .selection-buttons")
      .getByText("Nein");

    expect(geschaeftsKundeAlert).toHaveText("Nein");
    await geschaeftsKundeAlert.click(); // click no

    const Login = await page
      .locator(".navigation-user .nav-account .nav-account-item")
      .getByText("Anmelden"); // find the button

    expect(Login).toHaveText("Anmelden"); // validate it
    await Login.click(); // click the button

    const loginDetails = await page // define a variable to avoid same code
      .locator(".top")
      .locator("form")
      .locator(".form-line");

    const emailInput = await loginDetails // email input
      .first()
      .locator("#email");

    await emailInput.fill(`${data[1].email}`); // write email
    expect(emailInput).toHaveValue(`${data[1].email}`); // validate it

    const passwordInput = await loginDetails.nth(1).getByText("Passwort");
    // password input

    await passwordInput.fill(`${data[0].password}`);
    expect(passwordInput).toHaveValue(`${data[0].password}`);

    const loginButton = await loginDetails
      .nth(3)
      .getByRole("button", { name: "Anmelden" }); // login button
    expect(loginButton).toHaveText("Anmelden"); // validate it
    await loginButton.click(); // click the button
  });

  test("login as B2T", async ({ page }) => {
    const yesButton = await page
      .locator(".inner .selection-buttons")
      .getByText("Ja");
    await expect(yesButton).toHaveText("Ja"); // validate it

    await page.waitForNavigation();
    await yesButton.click(); // click the button

    await expect(page.url()).toBe("https://www.rameder.de/haendler.html");

    await page
      .getByPlaceholder("muster@muster.com")
      .fill(`${data[2].password}`);

    await page.getByPlaceholder("******").fill(data[0].password);

    const nowLoginButton = await page.getByRole("button", {
      name: "Jetzt anmelden",
    });
    expect(nowLoginButton).toHaveText("Jetzt anmelden"); // validate it
    await nowLoginButton.click(); // login
  });
});

test.describe("Failed login with 3 accounts", () => {
  test("failed login as B2C", async ({ page }) => {
    const geschaeftsKundeAlert = await page
      .locator(".inner .selection-buttons")
      .getByText("Nein");

    expect(geschaeftsKundeAlert).toHaveText("Nein"); // validate it
    geschaeftsKundeAlert.click(); // click no

    const Login = await page
      .locator(".navigation-user .nav-account .nav-account-item")
      .getByText("Anmelden"); // find the button

    expect(Login).toHaveText("Anmelden"); // validate it
    Login.click(); // click the button

    const loginDetails = await page // define a variable to avoid same code
      .locator(".top")
      .locator("form")
      .locator(".form-line");

    const emailInput = await loginDetails // email input
      .first()
      .locator("#email");

    await emailInput.fill("wrongemail@gmail.com"); // write email
    expect(emailInput).toHaveValue(`${data[0].email}`); // validate it

    const passwordInput = await loginDetails.nth(1).getByText("Passwort");
    // password input

    await passwordInput.fill(`wrongPassword`);
    expect(passwordInput).toHaveValue(`${data[0].password}`);

    const loginButton = await loginDetails
      .nth(3)
      .getByRole("button", { name: "Anmelden" }); // login button
    expect(loginButton).toHaveText("Anmelden"); // validate it
    await loginButton.click(); // click the button

    const failedPassword = await page //message falsch
      .locator("form .uk-alert-danger")
      .locator("p strong")
      .textContent();

    await expect(failedPassword).toContain(
      "Falsche E-Mail-Adresse oder falsches Passwort!" // validate it
    );
  });

  test("failed login as B2B", async ({ page }) => {
    const geschaeftsKundeAlert = await page
      .locator(".inner .selection-buttons")
      .getByText("Nein");

    expect(geschaeftsKundeAlert).toHaveText("Nein"); // validate it
    geschaeftsKundeAlert.click(); // click no

    const Login = await page
      .locator(".navigation-user .nav-account .nav-account-item")
      .getByText("Anmelden"); // find the button

    expect(Login).toHaveText("Anmelden"); // validate it
    Login.click(); // click the button

    const loginDetails = await page // define a variable to avoid same code
      .locator(".top")
      .locator("form")
      .locator(".form-line");

    const emailInput = await loginDetails // email input
      .first()
      .locator("#email");

    await emailInput.fill(`wrongemail@gmail.com`); // write email
    expect(emailInput).toHaveValue(`${data[1].email}`); // validate it

    const passwordInput = await loginDetails.nth(1).getByText("Passwort");
    // password input

    await passwordInput.fill(`wrongPassword`);
    expect(passwordInput).toHaveValue(`${data[1].password}`);

    const loginButton = await loginDetails
      .nth(3)
      .getByRole("button", { name: "Anmelden" }); // login button
    expect(loginButton).toHaveText("Anmelden"); // validate it
    await loginButton.click(); // click the button

    const failedPassword = await page //message falsch
      .locator("form .uk-alert-danger")
      .locator("p strong")
      .textContent();

    await expect(failedPassword).toContain(
      "Falsche E-Mail-Adresse oder falsches Passwort!" // validate it
    );
  });

  test("failed login as B2T", async ({ page }) => {
    const yesButton = await page
      .locator(".inner .selection-buttons")
      .getByText("Ja");
    await expect(yesButton).toHaveText("Ja"); // validate it

    await page.waitForNavigation();
    await yesButton.click(); // click the button

    await expect(page.url()).toBe("https://www.rameder.de/haendler.html");

    const emailInput = await page.getByPlaceholder("muster@muster.com"); // get email input
    const passwordInputPlaemailVlaue = emailInput.getAttribute("placeholder"); // get attribute
    await expect(passwordInputPlaemailVlaue).toEqual("muster@muster.com"); // validate atribute value

    await emailInput.fill("wrongemail@gmail.com"); // write wrong email
    expect(emailInput).toHaveValue(`${data[2].email}`); // validate it with true email

    const passwordInput = await page.getByPlaceholder("******"); // get password input
    const passwordInputPlaceholderVlaue =
      passwordInput.getAttribute("placeholder"); // get attribute
    await expect(passwordInputPlaceholderVlaue).toEqual("******"); // validate atribute value

    await passwordInput.fill("wrongPassword");
    expect(passwordInput).toHaveValue(`${data[0].password}`);

    const nowLoginButton = await page.getByRole("button", {
      name: "Jetzt anmelden",
    });
    expect(nowLoginButton).toHaveText("Jetzt anmelden"); // validate it
    await nowLoginButton.click(); // login

    const failedPassword = await page //message falsch
      .locator("form .uk-alert-danger")
      .locator("p strong")
      .textContent();

    await expect(failedPassword).toContain(
      "Falsche E-Mail-Adresse oder falsches Passwort!" // validate it
      
    );
  });
});
