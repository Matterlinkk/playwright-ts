import { BaseComponent } from "@pages/baseComponent";
import { Locator, Page } from "@playwright/test";

class CheckoutComponent extends BaseComponent {
  readonly totalResult: Locator;

  protected constructor(page: Page) {
    super(page);
    this.totalResult = this.page.locator(".pay");
  }
}

export { CheckoutComponent };
