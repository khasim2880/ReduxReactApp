// reducers.js
import {
  combineReducers,
} from 'redux';
import { plp } from './plpReducer';
import { category } from './categoryReducer';

export const reducers = combineReducers({
  plp,
  category,
});