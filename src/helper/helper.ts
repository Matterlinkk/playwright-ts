const convertCoffeePriceToInt = (value: string): number => {
  return Number(value.split('.')[0].replace('$', ''));
};

const convertCoffeeUnitToPriceAndQty = (value: string): [number, number] => {
  const price = Number(value.split('.')[0].replace('$', ''));
  const qty = Number(Number(value.split('x').at(-1).trim()));
  return [price, qty];
};

export { convertCoffeePriceToInt, convertCoffeeUnitToPriceAndQty };
