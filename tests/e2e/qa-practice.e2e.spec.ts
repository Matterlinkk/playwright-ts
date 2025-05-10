import { test, expect } from '@support/fixtures';

test.describe('Iframe Pop-up area', () => {
  test.beforeEach(async ({ popUpPage }) => {
    await popUpPage.goto(popUpPage.url, '/iframe_popup');
    await popUpPage.getBtnByText('Launch Pop-Up').click();
    await expect(popUpPage.modalWindowComponent.modalWindow).toBeVisible();
  });

  test('Iframe Pop-up', async ({ popUpPage }) => {
    const copiedText = await popUpPage.modalWindowComponent.copyTextAndConfirmModal();
    await popUpPage.fillInputAndSubmitForm(copiedText);
    await expect(popUpPage.checkResult).toContainText('Correct!');
  });
});

test.describe('Modal Pop-up area', () => {
  test.beforeEach(async ({ popUpPage }) => {
    await popUpPage.goto(popUpPage.url, '/modal');
    await popUpPage.getBtnByText('Launch Pop-Up').click();
    await expect(popUpPage.modalWindowComponent.modalWindow).toBeVisible();
  });

  test('Modal Pop-up | Positive case', async ({ popUpPage }) => {
    await popUpPage.modalWindowComponent.clickCheckboxAndSubmitForm();
    await expect(popUpPage.result).toContainText('select me or not');
  });

  test('Modal Pop-up | Negative case', async ({ popUpPage }) => {
    await popUpPage.modalWindowComponent.submitForm();
    await expect(popUpPage.result).toContainText('None');
  });
});
