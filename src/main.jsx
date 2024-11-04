import { createRoot } from 'react-dom/client';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './services/reducers/root-reducer.js';
import App from './App.jsx';
import './index.css';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// Создание enhancer
const enhancer = composeEnhancers(applyMiddleware(thunk));

// Создание Redux store
const store = createStore(rootReducer, enhancer);

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>,
);
