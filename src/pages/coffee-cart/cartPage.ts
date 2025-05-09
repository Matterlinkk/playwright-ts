import { BasePage } from '@pages/basePage';
import { Locator, Page } from '@playwright/test';
import { CheckoutComponent } from '@pages/coffee-cart/components/checkoutComponent';
import { convertCoffeeUnitToPriceAndQty } from '@helper/helper';

class CartPage extends BasePage {
  readonly checkoutComponent: CheckoutComponent;
  public readonly url: string;
  public readonly menuButton: Locator;
  public readonly noCoffeeDescription: Locator;
  public readonly deleteButton: Locator;

  protected constructor(page: Page) {
    super(page);
    this.checkoutComponent = new CheckoutComponent(page);
    this.url = 'https://coffee-cart.app';
    this.menuButton = this.page.locator("[aria-label='Menu page']");
    this.noCoffeeDescription = this.page.locator('.list p');
    this.deleteButton = this.page.locator('.delete');
  }

  getCoffeeFromList(coffeeType: string) {
    return this.page
      .getByRole('listitem')
      .filter({ has: this.page.getByText(coffeeType, { exact: true }) });
  }

  async switchToMenuArea() {
    await this.menuButton.click();
  }

  async getPriceAndQtyCoffeeCup(coffeeType: string) {
    const coffeeInfo = await this.getCoffeeFromList(coffeeType).locator('.unit-desc').textContent();
    if (coffeeInfo === null) {
      throw new Error('Error with parsing the element text');
    }
    return convertCoffeeUnitToPriceAndQty(coffeeInfo);
  }

  async addCoffeeCupToCart(coffeeType: string, number: number = 1) {
    if (number < 0) {
      throw new Error('Number must be greater than 0');
    }

    for (let i = 0; i < number; i++) {
      await this.getCoffeeFromList(coffeeType)
        .getByRole('button', { name: `Add one ${coffeeType}` })
        .click();
    }
  }
}

export { CartPage };
