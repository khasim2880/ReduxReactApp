import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import AppContainer from './containers/AppContainer';
// Add these imports - Step 1
import { Provider } from 'react-redux';  
import { store } from './store/store';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((  
	<BrowserRouter>
  		<Provider store={store}>
    		<AppContainer />
  		</Provider>
  	</BrowserRouter>),
  document.getElementById('root')
);
registerServiceWorker();
