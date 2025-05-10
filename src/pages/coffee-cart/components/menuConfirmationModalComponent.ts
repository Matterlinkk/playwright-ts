import { BaseComponent } from "@pages/baseComponent";
import { Locator, Page } from "@playwright/test";

class MenuConfirmationModalComponent extends BaseComponent {
  readonly confirmationText: Locator;

  protected constructor(page: Page) {
    super(page);
    this.confirmationText = this.page.locator(
      "[data-cy='add-to-cart-modal'] p",
    );
  }
}

export { MenuConfirmationModalComponent };
