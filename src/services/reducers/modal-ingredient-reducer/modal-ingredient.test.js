import { modalIngredientReducer, initialState } from './modal-ingredient-reducer';
import { ADD_MODAL_INGREDIENT, CLEAR_MODAL_INGREDIENT } from '../../../utils/vars';
import { describe, it, expect } from '@jest/globals';

describe('modalIngredientReducer', () => {
	it('должен вернуть начальное состояние', () => {
		expect(modalIngredientReducer(undefined, { type: '', payload: [] })).toEqual(initialState);
	});

	it('устанавливает значение modal', () => {
		const testString = 'testString';
		const action = { type: ADD_MODAL_INGREDIENT, payload: testString };
		const expectedState = {
			...initialState,
			ingredientsModal: [...initialState.ingredientsModal, testString],
		};

		expect(modalIngredientReducer(initialState, action)).toEqual(expectedState);
	});

	it('очищает значение modal', () => {
		const action = { type: CLEAR_MODAL_INGREDIENT };
		const expectedState = {
			...initialState,
			ingredientsModal: [],
		};

		expect(modalIngredientReducer(initialState, action)).toEqual(expectedState);
	});
});
