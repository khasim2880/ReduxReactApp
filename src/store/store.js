// store.js
import {
  createStore,
} from 'redux';
import {  
  reducers
} from '.././reducers/reducer';

export function configureStore(initialState = {}) {  
  const store = createStore(reducers, initialState);
  return store;
};

export const store = configureStore();

/**
 * Subscribing to the store makes it possible to
 * execute some code every time the state is updated.
 */
store.subscribe(() => {
  console.log(store.getState());
});

//store.dispatch(Save_Menu('I shook up the world!', 'Muhammad Ali'));//Dispatch an action to change the state

//store.replaceReducer(nextReducer);//Replaces the current reducer with another

export default store;