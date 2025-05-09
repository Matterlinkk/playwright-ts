import { test as base } from '@playwright/test';
import { PopUpPage } from '@pages/qa-practice/popUpPage';
import { MenuPage } from '@pages/coffee-cart/menuPage';
import { CartPage } from '@pages/coffee-cart/cartPage';

type Pages = {
  popUpPage: PopUpPage;
  menuPage: MenuPage;
  cartPage: CartPage;
};

export const test = base.extend<Pages>({
  popUpPage: async ({ page }, use) => {
    const popUpPage = new PopUpPage(page);
    await use(popUpPage);
  },
  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);
    await use(menuPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});

export { expect } from '@playwright/test';
