import { orderReducer, initialState } from './order-reducer';
import { ADD_ORDER_DETAIL, CLEAR_ORDER_DETAIL, ORDER_SUCCESS, ORDER_FAILURE } from '../../../utils/vars';

describe('orderReducer', () => {
	it('должен вернуть начальное состояние', () => {
		expect(orderReducer(undefined, {} as any)).toEqual(initialState);
	});

	it('должен установить loading в true при добавлении деталей заказа', () => {
		const action = { type: ADD_ORDER_DETAIL };
		const expectedState = { ...initialState, loading: true };
		expect(orderReducer(initialState, action)).toEqual(expectedState);
	});

	it('должен установить order и loading в false при успешном заказе', () => {
		const orderData = { id: 1, item: 'Тест' };
		const action = { type: ORDER_SUCCESS, payload: orderData };
		const expectedState = { ...initialState, order: orderData, loading: false };
		expect(orderReducer(initialState, action)).toEqual(expectedState);
	});

	it('должен установить error при неудаче заказа', () => {
		const errorMessage = 'Ошибка при выполнении заказа';
		const action = { type: ORDER_FAILURE, payload: errorMessage };
		const expectedState = { ...initialState, loading: false, error: errorMessage };
		expect(orderReducer(initialState, action)).toEqual(expectedState);
	});

	it('должен сбросить состояние при очистке деталей заказа', () => {
		const action = { type: CLEAR_ORDER_DETAIL };
		expect(orderReducer(initialState, action)).toEqual(initialState);
	});
});
