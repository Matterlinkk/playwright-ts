import { BasePage } from "@pages/basePage";
import { Page, Locator } from "@playwright/test";
import { ModalWindowComponent } from "@pages/qa-practice/components/modalWindowComponent";

class PopUpPage extends BasePage {
  public readonly url: string;
  public readonly modalWindowComponent: ModalWindowComponent;
  public readonly formInput: Locator;
  public readonly checkResult: Locator;
  public readonly checkbox: Locator;
  public readonly result: Locator;

  protected constructor(page: Page) {
    super(page);
    // Additional component pages to avoid the diamond page concept and to de-structure the PO into smaller and more convenient units
    this.modalWindowComponent = new ModalWindowComponent(page);
    // Url to specified area
    this.url = "https://www.qa-practice.com/elements/popup";
    this.formInput = this.page.locator("#id_text_from_iframe");
    this.checkResult = this.page.locator("#check-result");
    this.result = this.page.locator("#result");
  }

  async fillInputAndSubmitForm(value: string) {
    await this.formInput.fill(value);
    await this.getBtnByText("Submit").click();
  }
}

export { PopUpPage };
