import { v4 as uuidv4 } from 'uuid';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, MOVE_INGREDIENT, CLEAR_CONSRUCTOR } from '../../utils/vars';
import { ItemConstructor } from '../../utils/types';

// Определение интерфейсов действий с префиксом I
interface IAddIngredientAction {
	type: typeof ADD_INGREDIENT;
	payload: (ItemConstructor & { uniqueId: string })[];
}

interface IRemoveIngredientAction {
	type: typeof REMOVE_INGREDIENT;
	payload: ItemConstructor[];
}

interface IMoveIngredientAction {
	type: typeof MOVE_INGREDIENT;
	payload: { fromIndex: number; toIndex: number };
}

interface IClearConstructorAction {
	type: typeof CLEAR_CONSRUCTOR;
}

const addIngredient = (ingredient: ItemConstructor): IAddIngredientAction => {
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

const removeIngredient = (arr: ItemConstructor[]): IRemoveIngredientAction => ({
	type: REMOVE_INGREDIENT,
	payload: arr,
});

const moveIngredient = (fromIndex: number, toIndex: number): IMoveIngredientAction => ({
	type: MOVE_INGREDIENT,
	payload: { fromIndex, toIndex },
});

const clearConstructor = (): IClearConstructorAction => ({
	type: CLEAR_CONSRUCTOR,
});

export { addIngredient, removeIngredient, moveIngredient, clearConstructor };
export type TBurgerConstructorActions = IAddIngredientAction | IRemoveIngredientAction | IMoveIngredientAction | IClearConstructorAction;
