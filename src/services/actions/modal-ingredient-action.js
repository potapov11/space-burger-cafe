import { ADD_MODAL_INGREDIENT, CLEAR_MODAL_INGREDIENT } from '../../utils/vars';

const addModalIngredient = (ingredient) => ({
	type: ADD_MODAL_INGREDIENT,
	payload: ingredient,
});

const clearModalIngredient = () => ({
	type: CLEAR_MODAL_INGREDIENT,
});

export { addModalIngredient, clearModalIngredient };
