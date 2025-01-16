import { ADD_MODAL_INGREDIENT, CLEAR_MODAL_INGREDIENT } from '../../utils/vars';
import { ItemConstructor } from '../../utils/types';

interface AddModalIngredientAction {
	type: typeof ADD_MODAL_INGREDIENT;
	payload: ItemConstructor;
}

interface ClearModalIngredientAction {
	type: typeof CLEAR_MODAL_INGREDIENT;
}

const addModalIngredient = (ingredient: ItemConstructor): AddModalIngredientAction => ({
	type: ADD_MODAL_INGREDIENT,
	payload: ingredient,
});

const clearModalIngredient = (): ClearModalIngredientAction => ({
	type: CLEAR_MODAL_INGREDIENT,
});

export { addModalIngredient, clearModalIngredient };

export type TModalIngredientActions = AddModalIngredientAction | ClearModalIngredientAction;
