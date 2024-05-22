import test from "@playwright/test";

test("main test", async ({ page }) => {
  await page.goto("https://www.rameder.de");
  await page.getByText("Ich stimme zu").click();
  await page.locator(".inner .selection-buttons").getByText("Nein").click();
  await page
    .locator(".navigation-user .nav-account .nav-account-item")
    .getByText("Anmelden")
    .click();
});
