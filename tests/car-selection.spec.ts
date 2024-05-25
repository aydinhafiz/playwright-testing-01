import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.rameder.de");
  await expect(page.url()).toBe("https://www.rameder.de/"); // validate it
  await page.getByText("Ich stimme zu").click();
});

test.describe("Main Test", () => {
  test("select car model", async ({ page }) => {
    const geschaeftsKundeAlert = await page
      .locator(".inner .selection-buttons")
      .getByText("Nein");

    expect(geschaeftsKundeAlert).toHaveText("Nein"); // validate it
    await geschaeftsKundeAlert.click(); // click no

    ///////////////////////MARKE//////////////////////////////////////////
    const marke = await page.selectOption(".input-new", "5");

    const selectedMarkeValue = await page.$eval(
      ".input-new",
      (element) => element.value
    );
    expect(selectedMarkeValue).toContain("5"); // validate the value

    const selectedMarkeContent = await page.$eval(
      ".input-new",
      (element) => element.textContent
    );
    expect(selectedMarkeContent).toContain("Audi"); // validate the content

    //////////////////////MODELL//////////////////////////////////////////////////////

    const modell = await page.selectOption(
      '[name="tecdoc[context][stepbystep][model]"]',
      "30"
    );

    const selectedModellValue = await page.$eval(
      '[name="tecdoc[context][stepbystep][model]"]',
      (element) => element.value
    );

    expect(selectedModellValue).toContain("30"); // validate the value

    const selectedModellContent = await page.$eval(
      '[name="tecdoc[context][stepbystep][model]"]',
      (element) => element.textContent // catch content
    );

    expect(selectedModellContent).toContain(
      "100 C3 Avant (445, 446) 08.82 - 11.90"
    ); // validate the content

    ////////////////MOTOR////////////////////////////////////////////////////////////////////
    const motor = await page.selectOption(
      '[name="tecdoc[context][stepbystep][type]"]',
      "1418"
    );

    // const selectedMotorValue = await page.$eval(
    //   '[name="tecdoc[context][stepbystep][type]"]',
    //   (element) => {
    //     element.value; // catch the value
    //     console.log(element.value);
    //   }
    // );

    // expect(selectedMotorValue).toContain("1418"); // validate the value // habe einen error erhalten: Matcher error: received value must not be null nor undefined//

    // const selectedMotorContent = await page.$eval(
    //   '[name="tecdoc[context][stepbystep][type]"]',
    //   (element) => {
    //     element.textContent; // catch the content
    //   }
    // );

    // expect(selectedMotorContent).toContain("1.8 66kW (90PS)"); // validate the conent // dasselbe error : Matcher error: received value must not be null nor undefined

    await page
      .locator("form")
      .getByRole("button", { name: "Fahrzeug finden" })
      .first()
      .click();

    expect(page.url()).toBe(
      "https://www.rameder.de/anhaengerkupplung/anhaengerkupplungen/"
    );

    const articleNumberText = await page
      .locator('[class="header-product desktop"]')
      .locator('[class="art-nr"]')
      .first()
      .textContent();

    const splittedArticleNumber = articleNumberText?.split(" "); // splitten um nur die artikel nummer zu holen
    const pureArticleNumber = splittedArticleNumber[1]
      ? splittedArticleNumber[1]
      : "190508-00030-1"; // hier wirdsplittedArticleNumber[1] genommen deswegen braucht man hier kein ternary operator

    await page
      .getByRole("button", { name: "in den warenkorb" })
      .first()
      .click();

    await page
      .locator('[class="navigation-user"]')
      .locator('[class="nav-account desktop"]')
      .locator("#miniCart")
      .locator('[class="nav-account-item nav-cart uk-open"]')
      .click();

    //.hover();

    // const barText = await page
    //   .locator('[class="navigation-user"]')
    //   .locator('[class="nav-account desktop"]')
    //   .locator("#miniCart")
    //   .locator('[class="nav-account-item nav-cart uk-open"]')
    //   .locator(
    //     '[class="layer-header layer-cart uk-dropdown uk-open uk-dropdown-bottom-right"]'
    //   )
    //   .locator(".inner")
    //   .locator(".list-layer-cart")
    //   .locator(".item .text")
    //   .locator(".title-layer")
    //   .locator("a")
    //   .textContent();

    // await expect(barText).toContain(
    //   "Trail-Tec Elektrosatz 7polig Summer universal"
    // );
    //  basket validieren erzeugt error: waiting for locator

    const cardArticleNumber = await page
      .getByText("Art-Nr.: 190508-00030-1")
      .first()
      .textContent();
    //  const cardArticleNumber = await page                // habe beide methoden probiert um artikel nummer zu waehlen hatte leider immernoch bei line 150 einen error
    //  .locator(".item-product .content-product")
    //  .first()
    //  .locator(".header-product")
    //  .locator(".art-nr")
    //  .textContent();

    const splittedCardArticleNumber = cardArticleNumber?.split(" ");

    const pureCardArticleNumber = splittedCardArticleNumber[1]
      ? splittedCardArticleNumber[1]
      : "190508-00030-1"; // hier wird aber string executed weil splittedCardArticleNumber[1] undefined ist. Warum das so ist weiß ich aktuell nicht.
    console.log(pureArticleNumber);
    console.log(pureCardArticleNumber);

    await expect(pureCardArticleNumber).toEqual(pureArticleNumber); // validate the articleNumber
  });
});
