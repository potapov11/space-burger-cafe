import React from 'react';
import { createRoot } from 'react-dom/client';
import { compose, createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './services/reducers/root-reducer.js';
import App from './components/App/App.tsx';
import './index.css';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

const rootElement = document.getElementById('root');

if (rootElement) {
	createRoot(rootElement).render(
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>,
	);
}
