import { FrameLocator, Page, Locator } from '@playwright/test';
import { BaseComponent } from '@pages/baseComponent';

class ModalWindowComponent extends BaseComponent {
  readonly modalWindow: Locator;
  readonly modalIframe: FrameLocator;
  readonly checkbox: Locator;

  constructor(page: Page) {
    super(page);
    this.modalIframe = this.page.frameLocator('.modal-content iframe');
    this.modalWindow = this.page.locator('.modal-content');
    this.checkbox = this.page.locator("[name='checkbox']");
  }

  async copyTextAndConfirmModal() {
    const copiedText = await this.modalIframe.locator('#text-to-copy').textContent();
    if (copiedText === null) {
      throw new Error('Error with parsing text from the element');
    }
    await this.getBtnByText('Check').click();
    return copiedText;
  }

  async clickCheckboxAndSubmitForm() {
    await this.checkbox.click();
    await this.getBtnByText('Send').click();
  }

  async submitForm() {
    await this.getBtnByText('Send').click();
  }
}

export { ModalWindowComponent };
