import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { persistConfig } from './utils'

const initialState = {
  products: [[]],
  label: '57c7e5353ce7d5f10c8b4b4b',
  step: 0,
  email: '',
  loading: false,
}

const mainReducer = (state = initialState, action) => {
 switch (action.type) {
  case 'CHANGE_EMAIL':
   return {...state, email: action.payload}
  case 'SET_PRODUCTS':
   return {...state, products: action.payload}
  case 'CHANGE_LABEL':
   return {...state, label: action.payload}
  case 'CHANGE_STEP':
   return {...state, step: action.payload}
  case 'STEP_LOADING':
   return {...state, loading: action.payload}
  default:
   return state
 }
}

const whitelist = ['products', 'label', 'step', 'email'];

const main = persistReducer(persistConfig({ key: 'main', whitelist }), mainReducer);

export default combineReducers({
  main,
});
