import { Page } from '@playwright/test';
import { BaseElement } from '@pages/baseElement';

abstract class BaseComponent extends BaseElement {
  protected page: Page;

  protected constructor(page: Page) {
    super(page);
    this.page = page;
  }
}

export { BaseComponent };
