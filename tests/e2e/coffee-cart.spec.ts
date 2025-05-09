import { test, expect } from '@support/fixtures';
import { MouseAction } from '@helper/constants';
import { convertCoffeePriceToInt } from '@helper/helper';
import { coffeeTestcases, coffees, coffeeName } from '@data/coffeeData';

test.describe('Add coffee functionality', () => {
  test.beforeEach(async ({ menuPage }) => {
    await menuPage.goto(menuPage.url);
  });

  coffeeTestcases.forEach(testCase => {
    test(`Add ${testCase.coffeeType} coffee with ${testCase.clickAction} click`, async ({
      menuPage,
    }) => {
      const coffeePrice = await menuPage.getCoffeeCupPrice(testCase.coffeeType);

      await menuPage.addCoffeeCup(testCase.coffeeType, testCase.clickAction);
      await expect(menuPage.checkoutComponent.totalResult).toContainText(coffeePrice);

      if (testCase.clickAction === MouseAction.RIGHT) {
        await expect(menuPage.menuConfirmationModal.confirmationText).toContainText(
          testCase.coffeeType
        );
      }
    });
  });

  test('Check the result calculates the correct price', async ({ menuPage }) => {
    let sumCoffeePrice = 0;

    for (const coffeeType of coffees) {
      const coffeePrice = await menuPage.getCoffeeCupPrice(coffeeType);
      await menuPage.addCoffeeCup(coffeeType);
      sumCoffeePrice += convertCoffeePriceToInt(coffeePrice);
    }

    await expect(menuPage.checkoutComponent.totalResult).toContainText(
      `Total: $${sumCoffeePrice}.00`
    );
  });
});

test.describe('Cart area', () => {
  test.beforeEach(async ({ menuPage }) => {
    await menuPage.goto(menuPage.url);
  });

  test('Check cart list is not empty after choosing coffee', async ({ menuPage, cartPage }) => {
    await menuPage.switchToCartArea();
    await expect(cartPage.noCoffeeDescription).toContainText('No coffee, go add some.');
    await cartPage.switchToMenuArea();

    for (const coffeeType of coffees) {
      await menuPage.addCoffeeCup(coffeeType);
    }

    await menuPage.switchToCartArea();

    for (const coffeeType of coffees) {
      await expect(cartPage.getCoffeeFromList(coffeeType)).toBeVisible();
    }

    while ((await cartPage.deleteButton.count()) > 0) {
      await cartPage.deleteButton.nth(0).click();
    }

    await expect(cartPage.noCoffeeDescription).toContainText('No coffee, go add some.');
  });

  test('Check cart unit updates', async ({ menuPage, cartPage }) => {
    await menuPage.addCoffeeCup(coffeeName);
    await menuPage.switchToCartArea();
    await cartPage.addCoffeeCupToCart(coffeeName, 2);

    const [coffeePrice, coffeeQty] = await cartPage.getPriceAndQtyCoffeeCup(coffeeName);

    await expect(cartPage.checkoutComponent.totalResult).toContainText(
      `Total: $${coffeePrice * coffeeQty}.00`
    );
  });
});
