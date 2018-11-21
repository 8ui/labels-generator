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
