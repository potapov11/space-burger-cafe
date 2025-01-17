import { ADD_MODAL_INGREDIENT, CLEAR_MODAL_INGREDIENT } from '../../../utils/vars';

interface ModalIngredientState {
	ingredientsModal: string[];
}

interface AddModalIngredientAction {
	type: typeof ADD_MODAL_INGREDIENT;
	payload: string;
}

interface ClearModalIngredientAction {
	type: typeof CLEAR_MODAL_INGREDIENT;
}

type ModalIngredientAction = AddModalIngredientAction | ClearModalIngredientAction;

export const initialState: ModalIngredientState = {
	ingredientsModal: [],
};

// Редьюсер
export const modalIngredientReducer = (state = initialState, action: ModalIngredientAction): ModalIngredientState => {
	switch (action.type) {
		case ADD_MODAL_INGREDIENT:
			return {
				...state,
				ingredientsModal: [...state.ingredientsModal, (action as AddModalIngredientAction).payload],
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
