import dataReducer from './data-reducer';
import constructorReducer from './constructor-reducer';
import modalIngredientReducer from './modal-ingredient-reducer';
import { orderReducer } from './order-reducer/order-reducer';
import userReducer from './login-reducer';
import orderSocketReducer from './order-socket-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	data: dataReducer,
	constructorReducer: constructorReducer,
	modalIngredientReducer: modalIngredientReducer,
	orderReducer: orderReducer,
	loginReducer: userReducer,
	orderSocketReducer: orderSocketReducer,
});

export default rootReducer;
