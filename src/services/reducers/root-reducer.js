import dataReducer from './data-reducer';
import constructorReducer from './constructor-reducer';
import modalIngredientReducer from './modal-ingredient-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	data: dataReducer,
	constructorReducer: constructorReducer,
	modalIngredientReducer: modalIngredientReducer,
});

export default rootReducer;
