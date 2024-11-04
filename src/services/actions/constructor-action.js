import { ADD_INGREDIENT } from '../../utils/vars';

const addIngredient = (ingredient) => ({
	type: ADD_INGREDIENT,
	payload: ingredient,
});

export default addIngredient;
