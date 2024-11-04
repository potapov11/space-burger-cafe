import { ADD_MODAL_INGREDIENT, CLEAR_MODAL_INGREDIENT } from '../../utils/vars';
const initialState = {
	ingredientsModal: [],
};

const modalIngredientReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MODAL_INGREDIENT:
			return {
				...state,
				ingredientsModal: [...state.ingredientsModal, action.payload],
			};
		case CLEAR_MODAL_INGREDIENT:
			return {
				...state,
				ingredientsModal: [],
			};
		default:
			return state;
	}
};

export default modalIngredientReducer;
