import { v4 as uuidv4 } from 'uuid';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, MOVE_INGREDIENT, CLEAR_CONSRUCTOR } from '../../utils/vars';
import { ItemConstructor } from '../../utils/types';

interface AddIngredientAction {
	type: typeof ADD_INGREDIENT;
	payload: (ItemConstructor & { uniqueId: string })[];
}

interface RemoveIngredientAction {
	type: typeof REMOVE_INGREDIENT;
	payload: ItemConstructor[];
}

interface MoveIngredientAction {
	type: typeof MOVE_INGREDIENT;
	payload: { fromIndex: number; toIndex: number };
}

interface ClearConstructorAction {
	type: typeof CLEAR_CONSRUCTOR;
}

const addIngredient = (ingredient: ItemConstructor): AddIngredientAction => {
	if (ingredient?.type === 'bun') {
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

const removeIngredient = (arr: ItemConstructor[]): RemoveIngredientAction => ({
	type: REMOVE_INGREDIENT,
	payload: arr,
});

const moveIngredient = (fromIndex: number, toIndex: number): MoveIngredientAction => ({
	type: MOVE_INGREDIENT,
	payload: { fromIndex, toIndex },
});

const clearConstructor = (): ClearConstructorAction => ({
	type: CLEAR_CONSRUCTOR,
});

export { addIngredient, removeIngredient, moveIngredient, clearConstructor };
