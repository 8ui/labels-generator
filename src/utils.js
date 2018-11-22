import storage from 'redux-persist/lib/storage'
import immutableTransform from 'redux-persist-transform-immutable';

export function persistConfig({ key, ...params }) {
  return {
    transforms: [immutableTransform()],
    storage,
    key,
    ...params,
  };
}

export const formatProduct = product => {
  const price = product[3]
    .replace(',', '.')
    .replace(/[^0-9.]/g, '');

  return {
    price: Number(price),
    name: product[0],
    barcode: product[1],
    sku: product[2],
    unit: product[4],
  }
}

export const pluralForm = function(number, one, two, five) {
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return five;
  }
  number %= 10;
  if (number == 1) {
    return one;
  }
  if (number >= 2 && number <= 4) {
    return two;
  }
  return five;
}
