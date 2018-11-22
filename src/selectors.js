import { labels } from './domain';
import { formatProduct } from './utils';

export const getMain = state => state.main;

export const getProducts = state => getMain(state).products

export const getLabel = state => getMain(state).label

export const getEmail = state => getMain(state).email

export const getStep = state => getMain(state).step

export const getLoading = state => getMain(state).loading

export const getCalcProducts = state => {
  const products = getProducts(state);

  return products
    .filter(([name]) => !!name)
    .map(formatProduct);
}

export const getBuildedData = state => {
  const list = getCalcProducts(state);
  const email = getEmail(state);

  const selected = getLabel(state);
  const label = labels.find(n => n._id === selected);

  return {
    data: {
      list,
      label,
      label_per_page: true,
    },
    email,
  }
}
