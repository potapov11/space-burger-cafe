import { constructorReducer, initialState } from './constructor-reducer';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, MOVE_INGREDIENT, CLEAR_CONSRUCTOR } from '../../../utils/vars';
import { describe, it, expect } from '@jest/globals';

describe('constructor reducer', () => {
	it('should return initial state', () => {
		expect(constructorReducer(undefined, { type: '', payload: [] })).toEqual(initialState);
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
				ingredients: [
					{
						_id: '1',
						name: 'Биокотлета из марсианской Магнолии',
						type: 'main',
						proteins: 420,
						fat: 142,
						carbohydrates: 242,
						calories: 4242,
						price: 424,
						image: 'https://code.s3.yandex.net/react/code/meat-01.png',
						image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
						__v: 0,
					},
					{
						_id: '2',
						name: 'Биокотлета из марсианской Магнолии',
						type: 'main',
						proteins: 420,
						fat: 142,
						carbohydrates: 242,
						calories: 4242,
						price: 424,
						image: 'https://code.s3.yandex.net/react/code/meat-01.png',
						image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
						__v: 0,
					},
				],
			},
		};

		const action = {
			type: REMOVE_INGREDIENT,
			payload: ['2', 1],
		};
		expect(constructorReducer(prevState, action)).toEqual({
			constructorElems: {
				bunItems: [],
				ingredients: [
					{
						_id: '1',
						name: 'Биокотлета из марсианской Магнолии',
						type: 'main',
						proteins: 420,
						fat: 142,
						carbohydrates: 242,
						calories: 4242,
						price: 424,
						image: 'https://code.s3.yandex.net/react/code/meat-01.png',
						image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
						__v: 0,
					},
				],
			},
		});
	});

	it('should handle MOVE_INGREDIENT', () => {
		const prevState = {
			constructorElems: {
				bunItems: [],
				ingredients: [
					{
						_id: '1',
						name: 'Биокотлета из марсианской Магнолии',
						type: 'main',
						proteins: 420,
						fat: 142,
						carbohydrates: 242,
						calories: 4242,
						price: 424,
						image: 'https://code.s3.yandex.net/react/code/meat-01.png',
						image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
						__v: 0,
					},
					{
						_id: '2',
						name: 'Биокотлета из марсианской Магнолии',
						type: 'main',
						proteins: 420,
						fat: 142,
						carbohydrates: 242,
						calories: 4242,
						price: 424,
						image: 'https://code.s3.yandex.net/react/code/meat-01.png',
						image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
						__v: 0,
					},
					{
						_id: '3',
						name: 'Биокотлета из марсианской Магнолии',
						type: 'main',
						proteins: 420,
						fat: 142,
						carbohydrates: 242,
						calories: 4242,
						price: 424,
						image: 'https://code.s3.yandex.net/react/code/meat-01.png',
						image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
						__v: 0,
					},
				],
			},
		};

		const action = {
			type: MOVE_INGREDIENT,
			payload: { fromIndex: 0, toIndex: 2 },
		};
		expect(constructorReducer(prevState, action)).toEqual({
			constructorElems: {
				bunItems: [],
				ingredients: [
					{
						_id: '2',
						name: 'Биокотлета из марсианской Магнолии',
						type: 'main',
						proteins: 420,
						fat: 142,
						carbohydrates: 242,
						calories: 4242,
						price: 424,
						image: 'https://code.s3.yandex.net/react/code/meat-01.png',
						image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
						__v: 0,
					},
					{
						_id: '3',
						name: 'Биокотлета из марсианской Магнолии',
						type: 'main',
						proteins: 420,
						fat: 142,
						carbohydrates: 242,
						calories: 4242,
						price: 424,
						image: 'https://code.s3.yandex.net/react/code/meat-01.png',
						image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
						__v: 0,
					},
					{
						_id: '1',
						name: 'Биокотлета из марсианской Магнолии',
						type: 'main',
						proteins: 420,
						fat: 142,
						carbohydrates: 242,
						calories: 4242,
						price: 424,
						image: 'https://code.s3.yandex.net/react/code/meat-01.png',
						image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
						__v: 0,
					},
				],
			},
		});
	});

	it('should handle CLEAR_CONSRUCTOR', () => {
		const prevState = {
			constructorElems: {
				bunItems: [],
				ingredients: [
					{
						_id: '1',
						name: 'Биокотлета из марсианской Магнолии',
						type: 'main',
						proteins: 420,
						fat: 142,
						carbohydrates: 242,
						calories: 4242,
						price: 424,
						image: 'https://code.s3.yandex.net/react/code/meat-01.png',
						image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
						__v: 0,
					},
					{
						_id: '2',
						name: 'Биокотлета из марсианской Магнолии',
						type: 'main',
						proteins: 420,
						fat: 142,
						carbohydrates: 242,
						calories: 4242,
						price: 424,
						image: 'https://code.s3.yandex.net/react/code/meat-01.png',
						image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
						__v: 0,
					},
				],
			},
		};

		const action = { type: CLEAR_CONSRUCTOR };
		expect(constructorReducer(prevState, action)).toEqual({
			constructorElems: {
				bunItems: [],
				ingredients: [],
			},
		});
	});
});
