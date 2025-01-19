import { orderSocketReducer } from './order-socket-reducer'; // Укажите правильный путь к вашему редюсеру
import {
	WS_AUTH_CONNECTION_CLOSED,
	WS_AUTH_CONNECTION_ERROR,
	WS_AUTH_CONNECTION_START,
	WS_AUTH_CONNECTION_SUCCESS,
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_GET_AUTH_ORDERS,
	WS_GET_ORDERS,
} from '../../actions/socket-action';
import { describe, it, expect } from '@jest/globals';

const initialState = {
	orders: [],
	userOrders: [],
	isLoading: true,
	total: '',
	totalToday: '',
};

describe('orderSocketReducer', () => {
	it('should handle WS_CONNECTION_START', () => {
		const action = { type: WS_CONNECTION_START };
		const expectedState = {
			...initialState,
			wsConnected: false,
			wsError: undefined,
		};

		expect(orderSocketReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle WS_CONNECTION_SUCCESS', () => {
		const action = { type: WS_CONNECTION_SUCCESS };
		const expectedState = {
			...initialState,
			wsConnected: true,
			wsError: undefined,
			isLoading: false,
		};

		expect(orderSocketReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle WS_CONNECTION_ERROR', () => {
		const action = { type: WS_CONNECTION_ERROR, payload: 'Connection error' };
		const expectedState = {
			...initialState,
			wsConnected: false,
			wsError: 'Connection error',
		};

		expect(orderSocketReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle WS_CONNECTION_CLOSED', () => {
		const action = { type: WS_CONNECTION_CLOSED };
		const expectedState = {
			...initialState,
			wsConnected: false,
			wsError: undefined,
			orders: [],
			total: 0,
			totalToday: 0,
		};

		expect(orderSocketReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle WS_GET_ORDERS', () => {
		const action = {
			type: WS_GET_ORDERS,
			payload: {
				orders: [{ id: 1, name: 'Order 1' }],
				total: 1,
				totalToday: 1,
			},
		};

		const expectedState = {
			...initialState,
			wsConnected: true,
			wsError: undefined,
			orders: action.payload.orders,
			total: action.payload.total,
			totalToday: action.payload.totalToday,
			isLoading: false,
		};

		expect(orderSocketReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle WS_AUTH_CONNECTION_START', () => {
		const action = { type: WS_AUTH_CONNECTION_START };
		const expectedState = {
			...initialState,
			wsAuthConnected: false,
			wsAuthError: undefined,
			isLoading: false,
		};

		expect(orderSocketReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle WS_AUTH_CONNECTION_SUCCESS', () => {
		const action = { type: WS_AUTH_CONNECTION_SUCCESS };
		const expectedState = {
			...initialState,
			wsAuthConnected: true,
			wsAuthError: undefined,
			isLoading: false,
		};

		expect(orderSocketReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle WS_AUTH_CONNECTION_ERROR', () => {
		const action = { type: WS_AUTH_CONNECTION_ERROR, payload: 'Auth connection error' };
		const expectedState = {
			...initialState,
			wsAuthConnected: false,
			wsAuthError: 'Auth connection error',
		};

		expect(orderSocketReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle WS_AUTH_CONNECTION_CLOSED', () => {
		const action = { type: WS_AUTH_CONNECTION_CLOSED };
		const expectedState = {
			...initialState,
			wsAuthConnected: false,
			wsAuthError: undefined,
			userOrders: [],
			total: 0,
			totalToday: 0,
		};

		expect(orderSocketReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle WS_GET_AUTH_ORDERS', () => {
		const action = {
			type: WS_GET_AUTH_ORDERS,
			payload: {
				orders: [{ id: 1, name: 'User Order 1' }],
				total: 1,
				totalToday: 1,
			},
		};

		const expectedState = {
			...initialState,
			wsAuthConnected: true,
			wsAuthError: undefined,
			userOrders: action.payload.orders,
			total: action.payload.total,
			totalToday: action.payload.totalToday,
			isLoading: false,
		};

		expect(orderSocketReducer(initialState, action)).toEqual(expectedState);
	});

	it('should return the initial state when action type is unknown', () => {
		const action = { type: 'UNKNOWN_ACTION' };
		expect(orderSocketReducer(initialState, action)).toEqual(initialState);
	});
});
