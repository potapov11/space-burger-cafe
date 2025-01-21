import { userReducer, initialState } from './login-reducer.ts'; // Укажите правильный путь к вашему редюсеру
import { LOGIN_USER, LOGIN_FAILURE, EMAIL_SUCCESS, EMAIL_FAILURE, LOGOUT_USER } from '../../../utils/vars';
import { describe, it, expect } from '@jest/globals';

describe('userReducer', () => {
	it('should handle LOGIN_USER', () => {
		const action = {
			type: LOGIN_USER,
			payload: {
				user: { email: 'test@example.com', name: 'Test User' },
				success: true,
			},
		};

		const expectedState = {
			...initialState,
			email: 'test@example.com',
			name: 'Test User',
			success: true,
			isAuthChecked: true,
		};

		expect(userReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle LOGIN_FAILURE', () => {
		const action = {
			type: LOGIN_FAILURE,
			payload: 'Login failed',
		};

		const expectedState = {
			...initialState,
			error: 'Login failed',
			isAuthChecked: false,
		};

		expect(userReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle EMAIL_SUCCESS', () => {
		const action = {
			type: EMAIL_SUCCESS,
			payload: 'Email sent successfully',
		};

		const expectedState = {
			...initialState,
			success: 'true',
			message: 'Email sent successfully',
		};

		expect(userReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle EMAIL_FAILURE', () => {
		const action = {
			type: EMAIL_FAILURE,
			payload: 'Email sending failed',
		};

		const expectedState = {
			...initialState,
			success: 'false',
			message: 'Email sending failed',
		};

		expect(userReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle LOGOUT_USER', () => {
		const action = {
			type: LOGOUT_USER,
			payload: {
				message: 'Logged out successfully',
			},
		};

		const expectedState = {
			email: '',
			name: '',
			success: '',
			error: '',
			isAuthChecked: true,
			message: 'Logged out successfully',
		};

		expect(userReducer(initialState, action)).toEqual(expectedState);
	});

	it('should return the initial state when action type is unknown', () => {
		const action = { type: 'UNKNOWN_ACTION' };
		expect(userReducer(initialState, action)).toEqual(initialState);
	});
});
