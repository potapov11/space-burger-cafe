import { createRoot } from 'react-dom/client';
import { compose, createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './services/reducers/root-reducer.js';
import App from './components/App/App.jsx';
import './index.css';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
);
