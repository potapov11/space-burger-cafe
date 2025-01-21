import { SET_ROLLS_ARRAY, SET_SAUCE_ARRAY, SET_MAIN_ARRAY } from '../../../utils/vars';
import { ItemConstructor } from '../../../utils/types';

interface DataState {
	rollsArray: ItemConstructor[];
	sauceArray: ItemConstructor[];
	mainArray: ItemConstructor[];
}

interface SetRollsArrayAction {
	type: typeof SET_ROLLS_ARRAY;
	payload: ItemConstructor[];
}

interface SetSauceArrayAction {
	type: typeof SET_SAUCE_ARRAY;
	payload: ItemConstructor[];
}

interface SetMainArrayAction {
	type: typeof SET_MAIN_ARRAY;
	payload: ItemConstructor[];
}

type DataAction = SetRollsArrayAction | SetSauceArrayAction | SetMainArrayAction;

export const initialState: DataState = {
	rollsArray: [],
	sauceArray: [],
	mainArray: [],
};

export const dataReducer = (state = initialState, action: DataAction): DataState => {
	switch (action.type) {
		case SET_ROLLS_ARRAY:
			return { ...state, rollsArray: action.payload };
		case SET_SAUCE_ARRAY:
			return { ...state, sauceArray: action.payload };
		case SET_MAIN_ARRAY:
			return { ...state, mainArray: action.payload };
		default:
			return state;
	}
};
