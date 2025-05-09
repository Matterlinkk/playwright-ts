import { Page } from '@playwright/test';
import { BaseElement } from '@pages/baseElement';

abstract class BasePage extends BaseElement {
  protected url?: string;

  protected constructor(page: Page, url?: string) {
    super(page);
    this.page = page;
    this.url = url;
  }

  goto = async (url: string, endpoint?: string): Promise<void> => {
    const finalUrl: string = endpoint ? url + endpoint : url;
    await this.page.goto(finalUrl);
  };
}

export { BasePage };
