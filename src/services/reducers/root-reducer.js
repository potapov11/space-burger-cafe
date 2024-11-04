import dataReducer from './data-reducer';
import constructorReducer from './constructor-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	data: dataReducer,
	constructorReducer: constructorReducer,
});

export default rootReducer;
