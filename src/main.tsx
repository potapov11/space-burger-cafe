import React from 'react';
import { createRoot } from 'react-dom/client';
import { compose, createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './services/reducers/root-reducer.js';
import App from './components/App/App.tsx';
import { socketMiddleware } from './services/middleware.ts';
import { ORDERS_SOCKET } from './utils/vars.ts';
import { useDispatch as dispatchHook } from 'react-redux';
import { useSelector as selectorHook } from 'react-redux';
import { wsActions, wsAuthActions } from './services/actions/socket-action.ts';
import './index.css';
import { RootState } from '@reduxjs/toolkit/query';
import * as Sentry from '@sentry/react';

Sentry.init({
	dsn: 'https://cd3b870ee01b973df195f3787d5cf180@o4509696797442048.ingest.de.sentry.io/4509696822935632',
	// Setting this option to true will send default PII data to Sentry.
	// For example, automatic IP address collection on events
	sendDefaultPii: true,
	integrations: [
		Sentry.replayIntegration({
			maskAllText: false, // Отключаем маскирование текста
			maskAllInputs: false, // Отключаем маскирование значений полей ввода
		}),
	],
	// Session Replay
	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(ORDERS_SOCKET, wsActions), socketMiddleware(ORDERS_SOCKET, wsAuthActions)));
export const store = createStore(rootReducer, enhancer);

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
