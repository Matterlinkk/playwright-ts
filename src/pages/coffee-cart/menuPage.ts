import { BasePage } from '@pages/basePage';
import { Locator, Page } from '@playwright/test';
import { MouseAction } from '@helper/constants';
import { MenuConfirmationModalComponent } from '@pages/coffee-cart/components/menuConfirmationModalComponent';
import { CheckoutComponent } from '@pages/coffee-cart/components/checkoutComponent';

class MenuPage extends BasePage {
  readonly menuConfirmationModal: MenuConfirmationModalComponent;
  readonly checkoutComponent: CheckoutComponent;
  public readonly url: string;
  public readonly cartButton: Locator;

  protected constructor(page: Page) {
    super(page);
    this.menuConfirmationModal = new MenuConfirmationModalComponent(page);
    this.checkoutComponent = new CheckoutComponent(page);
    this.url = 'https://coffee-cart.app';
    this.cartButton = this.page.locator("[aria-label='Cart page']");
  }

  getCoffeeCup = (coffeeType: string) => {
    return this.page.locator(`.cup-body[aria-label="${coffeeType}"]`);
  };

  async getCoffeeCupPrice(coffeeType: string) {
    const outcome = await this.page
      .locator('li', { hasText: coffeeType })
      .locator('h4 small')
      .textContent();
    if (outcome === null) {
      throw new Error('Error with parsing the element text');
    }
    return outcome;
  }

  async addCoffeeCup(coffeeType: string, action: MouseAction = MouseAction.LEFT) {
    await this.getCoffeeCup(coffeeType).click({ button: action });
    if (action === MouseAction.RIGHT) {
      await this.getBtnByText('Yes').click();
    }
  }

  async switchToCartArea() {
    await this.cartButton.click();
  }
}

export { MenuPage };
