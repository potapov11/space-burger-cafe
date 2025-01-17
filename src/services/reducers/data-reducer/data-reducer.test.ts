import { initialState, dataReducer } from './data-reducer';
import { SET_ROLLS_ARRAY, SET_SAUCE_ARRAY, SET_MAIN_ARRAY } from '../../../utils/vars';

describe('data-reducer', () => {
	it('должен вернуть начальное состояние', () => {
		expect(dataReducer(undefined, {} as any)).toEqual(initialState);
	});

	it('устанавливает ROLLS_ARRAY', () => {
		const rollsArray = ['rollTest1', 'rollTest2'];
		const action = { type: SET_ROLLS_ARRAY, payload: rollsArray as any };
		const expectedState = { ...initialState, rollsArray };

		expect(dataReducer(initialState, action)).toEqual(expectedState);
	});

	it('устанавливает SAUCE_ARRAY', () => {
		const sauceArray = ['sauceTest1', 'sauceTest2'];
		const action = { type: SET_SAUCE_ARRAY, payload: sauceArray as any };
		const expectedState = { ...initialState, sauceArray };

		expect(dataReducer(initialState, action)).toEqual(expectedState);
	});

	it('устанавливает SAUCE_ARRAY', () => {
		const mainArray = ['mainTest1', 'mainTest2'];
		const action = { type: SET_MAIN_ARRAY, payload: mainArray as any };
		const expectedState = { ...initialState, mainArray };

		expect(dataReducer(initialState, action)).toEqual(expectedState);
	});
});
