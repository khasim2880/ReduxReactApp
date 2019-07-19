// reducers.js
import {
  combineReducers,
} from 'redux';
import { plp } from './plpReducer';
import { pdp } from './pdpReducer';
import { category } from './categoryReducer';

export const reducers = combineReducers({
  plp,
  category,
  pdp
});