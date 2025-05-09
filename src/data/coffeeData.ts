import { MouseAction } from '@helper/constants';

const coffeeTestcases = [
  { coffeeType: 'Cappuccino', clickAction: MouseAction.LEFT },
  { coffeeType: 'Espresso Macchiato', clickAction: MouseAction.RIGHT },
  { coffeeType: 'Mocha', clickAction: MouseAction.RIGHT },
];

const coffees = ['Mocha', 'Cafe Latte'];

const coffeeName = 'Espresso Macchiato';

export { coffeeTestcases, coffees, coffeeName };
