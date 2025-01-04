import React from 'react';
import { createRoot } from 'react-dom/client';
import { compose, createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './services/reducers/root-reducer.js';
import App from './components/App/App.tsx';
import { ordersSocketMiddleware } from './services/middleware.ts';
import { ORDERS_SOCKET } from './utils/vars.ts';
import { useDispatch as dispatchHook } from 'react-redux';
import { useSelector as selectorHook } from 'react-redux';
import './index.css';
import { RootState } from '@reduxjs/toolkit/query';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, ordersSocketMiddleware(ORDERS_SOCKET)));
const store = createStore(rootReducer, enhancer);

const rootElement = document.getElementById('root');

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

if (rootElement) {
	createRoot(rootElement).render(
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>,
	);
}
