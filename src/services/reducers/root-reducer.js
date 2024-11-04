import dataReducer from './data-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	data: dataReducer,
});

export default rootReducer;
