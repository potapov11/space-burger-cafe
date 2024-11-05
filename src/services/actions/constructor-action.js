import { ADD_INGREDIENT, REMOVE_INGREDIENT, ADD_BUN } from '../../utils/vars';

const addIngredient = (ingredient) => ({
	type: ADD_INGREDIENT,
	payload: ingredient,
});

const removeIngredient = (arr) => ({
	type: REMOVE_INGREDIENT,
	payload: arr,
});

const addBun = (item) => ({
	type: ADD_BUN,
	payload: item,
});

const moveIngredient = (fromIndex, toIndex) => ({
	type: 'MOVE_INGREDIENT',
	payload: { fromIndex, toIndex },
});

export { addIngredient, removeIngredient, addBun, moveIngredient };
