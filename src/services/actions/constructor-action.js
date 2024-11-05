import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../utils/vars';

const addIngredient = (ingredient) => ({
	type: ADD_INGREDIENT,
	payload: ingredient,
});

const removeIngredient = (arr) => ({
	type: REMOVE_INGREDIENT,
	payload: arr,
});

export { addIngredient, removeIngredient };
