import { constructorReducer, initialState } from './constructor-reducer';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, MOVE_INGREDIENT, CLEAR_CONSRUCTOR } from '../../../utils/vars';

describe('constructor reducer', () => {
	it('should return initial state', () => {
		expect(constructorReducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle ADD_INGREDIENT', () => {
		const action = {
			type: ADD_INGREDIENT,
			payload: [{ _id: '1', type: 'ingredient' }],
		};
		expect(constructorReducer(initialState, action)).toEqual({
			constructorElems: {
				bunItems: [],
				ingredients: [{ _id: '1', type: 'ingredient' }],
			},
		});
	});

	it('should handle REMOVE_INGREDIENT', () => {
		const prevState = {
			constructorElems: {
				bunItems: [],
				ingredients: [{ _id: '1' }, { _id: '2' }],
			},
		};

		const action = {
			type: REMOVE_INGREDIENT,
			payload: ['2', 1],
		};
		expect(constructorReducer(prevState as any, action)).toEqual({
			constructorElems: {
				bunItems: [],
				ingredients: [{ _id: '1' }],
			},
		});
	});

	it('should handle MOVE_INGREDIENT', () => {
		const prevState = {
			constructorElems: {
				bunItems: [],
				ingredients: [{ _id: '1' }, { _id: '2' }, { _id: '3' }],
			},
		};

		const action = {
			type: MOVE_INGREDIENT,
			payload: { fromIndex: 0, toIndex: 2 },
		};
		expect(constructorReducer(prevState as any, action)).toEqual({
			constructorElems: {
				bunItems: [],
				ingredients: [{ _id: '2' }, { _id: '3' }, { _id: '1' }],
			},
		});
	});

	it('should handle CLEAR_CONSRUCTOR', () => {
		const prevState = {
			constructorElems: {
				bunItems: [],
				ingredients: [{ _id: '1' }, { _id: '2' }],
			},
		};

		const action = { type: CLEAR_CONSRUCTOR };
		expect(constructorReducer(prevState as any, action)).toEqual({
			constructorElems: {
				bunItems: [],
				ingredients: [],
			},
		});
	});
});
