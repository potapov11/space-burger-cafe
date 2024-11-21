import dataReducer from './data-reducer';
import constructorReducer from './constructor-reducer';
import passwordReducer from './password-reducer';
import modalIngredientReducer from './modal-ingredient-reducer';
import orderReducer from './order-reducer';
import registerReducer from './register-reducer';
import loginReducer from './login-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	data: dataReducer,
	constructorReducer: constructorReducer,
	modalIngredientReducer: modalIngredientReducer,
	orderReducer: orderReducer,
	passwordReducer: passwordReducer,
	registerReducer: registerReducer,
	loginReducer: loginReducer,
});

export default rootReducer;
