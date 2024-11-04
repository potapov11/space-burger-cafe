import { ADD_INGREDIENT } from '../../utils/vars';
const initialState = {
	ingredients: [],
};

const constructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_INGREDIENT:
			return {
				...state,
				ingredients: [...state.ingredients, action.payload],
			};
		default:
			return state;
	}
};

export default constructorReducer;
