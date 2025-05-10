import { Locator, Page } from "@playwright/test";

abstract class BaseElement {
  protected page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  getBtnByText = (text: string): Locator =>
    this.page.getByRole("button", { name: text });
}

export { BaseElement };
