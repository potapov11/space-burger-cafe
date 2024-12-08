import { v4 as uuidv4 } from 'uuid';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, MOVE_INGREDIENT, CLEAR_CONSRUCTOR } from '../../utils/vars';

const addIngredient = (ingredient) => {
	if (ingredient.type === 'bun') {
		return {
			type: ADD_INGREDIENT,
			payload: [
				{
					...ingredient,
					uniqueId: uuidv4(),
				},
				{
					...ingredient,
					uniqueId: uuidv4(),
				},
			],
		};
	} else {
		return {
			type: ADD_INGREDIENT,
			payload: [
				{
					...ingredient,
					uniqueId: uuidv4(),
				},
			],
		};
	}
};

const removeIngredient = (arr) => ({
	type: REMOVE_INGREDIENT,
	payload: arr,
});

const moveIngredient = (fromIndex, toIndex) => ({
	type: MOVE_INGREDIENT,
	payload: { fromIndex, toIndex },
});

const clearConstructor = () => {
	return {
		type: CLEAR_CONSRUCTOR,
	};
};

export { addIngredient, removeIngredient, moveIngredient, clearConstructor };
