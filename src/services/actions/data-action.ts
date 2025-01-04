import {
	baseURL,
	SET_MAIN_ARRAY,
	SET_SAUCE_ARRAY,
	SET_ROLLS_ARRAY,
	ORDER_SUCCESS,
	ORDER_FAILURE,
	EMAIL_SUCCESS,
	EMAIL_FAILURE,
	REGISTER_USER,
	REGISTER_FAILURE,
	LOGIN_USER,
	LOGIN_FAILURE,
	DATA_CHECK_USER,
	DATA_FETCH_ERROR,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILURE,
	LOGOUT_USER,
	LOGOUT_FAILURE,
} from '../../utils/vars.ts';

import { checkResponses } from '../../utils/utils.ts';
import { ItemConstructor } from '../../utils/types.ts';

interface ServerResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

// Тип для действия
interface Action<T> {
	type: string;
	payload: T;
}

interface TokenResponse {
	accessToken: string;
	refreshToken: string;
}

// Типы действий
type SetMainArrayAction = Action<ItemConstructor[]>;
type SetSauceArrayAction = Action<ItemConstructor[]>;
type SetRollsArrayAction = Action<ItemConstructor[]>;
type OrderSuccessAction = Action<ServerResponse<any>>;
type OrderFailureAction = Action<string>;
type EmailSuccessAction = Action<ServerResponse<any>>;
type EmailFailureAction = Action<string>;
type RegisterUserAction = Action<ServerResponse<any>>;
type RegisterFailureAction = Action<string>;
type LoginUserAction = Action<ServerResponse<any>>;
type LoginFailureAction = Action<string>;
type DataCheckUserAction = Action<ServerResponse<any>>;
type DataFetchErrorAction = Action<string>;
type ResetPasswordSuccessAction = Action<ServerResponse<any>>;
type ResetPasswordFailureAction = Action<string>;
type LogoutUserAction = Action<ServerResponse<any>>;
type LogoutFailureAction = Action<string>;

// Объединяем все действия в один тип
type FeedActions =
	| SetMainArrayAction
	| SetSauceArrayAction
	| SetRollsArrayAction
	| OrderSuccessAction
	| OrderFailureAction
	| EmailSuccessAction
	| EmailFailureAction
	| RegisterUserAction
	| RegisterFailureAction
	| LoginUserAction
	| LoginFailureAction
	| DataCheckUserAction
	| DataFetchErrorAction
	| ResetPasswordSuccessAction
	| ResetPasswordFailureAction
	| LogoutUserAction
	| LogoutFailureAction;

type Dispatch = (action: FeedActions) => void;

interface TokenResponse {
	refreshToken: string;
	accessToken: string;
}

const checkResponse = async (res: Response): Promise<any> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchServerData = () => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await fetch(`${baseURL}ingredients`);
			const data: ServerResponse<ItemConstructor[]> = await checkResponses(response);

			if (data.success && data.data) {
				const rollsArray = data.data.filter((item) => item.type === 'bun');
				const sauceArray = data.data.filter((item) => item.type === 'sauce');
				const mainArray = data.data.filter((item) => item.type === 'main');

				dispatch({ type: SET_ROLLS_ARRAY, payload: rollsArray });
				dispatch({ type: SET_SAUCE_ARRAY, payload: sauceArray });
				dispatch({ type: SET_MAIN_ARRAY, payload: mainArray });
			}
		} catch (error) {
			// console.error(`Произошла ошибка ${error}`);
		}
	};
};

export const createOrder = (ingredients: string[]) => async (dispatch: Dispatch) => {
	try {
		const response = await fetch(`${baseURL}orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('accessToken') || '',
			},
			body: JSON.stringify({ ingredients }),
		});

		const data: ServerResponse<any> = await checkResponses(response);
		dispatch({ type: ORDER_SUCCESS, payload: data });

		return data;
	} catch (error) {
		dispatch({ type: ORDER_FAILURE, payload: error.message });
	}
};

export const resetPassword = (email: string) => async (dispatch: Dispatch) => {
	const sendObject = { email };

	try {
		const response = await fetch(`${baseURL}password-reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sendObject),
		});

		const data: ServerResponse<any> = await checkResponses(response);
		dispatch({ type: EMAIL_SUCCESS, payload: data });

		return data;
	} catch (error) {
		dispatch({ type: EMAIL_FAILURE, payload: error.message });
	}
};

export const resetPasswordReset = (obj: { password: string; token: string }) => async (dispatch: Dispatch) => {
	try {
		const response = await fetch(`${baseURL}password-reset/reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(obj),
		});

		const data: ServerResponse<any> = await checkResponses(response);
		dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });

		return data;
	} catch (error) {
		dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
	}
};

export const registerFunc = (object: { email: string; password: string; name: string }) => async (dispatch: Dispatch) => {
	try {
		const response = await fetch(`${baseURL}auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(object),
		});

		const data: ServerResponse<any> = await checkResponse(response);

		if (data.success) {
			localStorage.setItem('refreshToken', data.data?.refreshToken || '');
		}

		dispatch({ type: REGISTER_USER, payload: data });
		return data;
	} catch (error) {
		dispatch({ type: REGISTER_FAILURE, payload: error.message });
	}
};

export const logOutFunc = () => async (dispatch: Dispatch) => {
	try {
		const response = await fetch(`${baseURL}auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
		});

		const data: ServerResponse<any> = await checkResponse(response);

		dispatch({ type: LOGOUT_USER, payload: data });
		return data;
	} catch (error) {
		dispatch({ type: LOGOUT_FAILURE, payload: error.message });
	}
};

export const loginFunc = (object: { email: string; password: string }) => async (dispatch: Dispatch) => {
	try {
		const response = await fetch(`${baseURL}auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(object),
		});

		const data: ServerResponse<TokenResponse> = await checkResponse(response);

		if (data.success) {
			const tokenData = data.data;

			if (tokenData) {
				localStorage.setItem('refreshToken', tokenData.refreshToken || '');
				localStorage.setItem('accessToken', tokenData.accessToken || '');
			}
		}

		dispatch({ type: LOGIN_USER, payload: data });
		return data;
	} catch (error) {
		if (error.message === 'jwt expired') {
			try {
				const refreshData = await refreshToken();
				const retryResponse = await fetch(`${baseURL}auth/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${refreshData.data?.accessToken || ''}`,
					},
					body: JSON.stringify(object),
				});

				const retryData: ServerResponse<TokenResponse> = await checkResponse(retryResponse);
				dispatch({ type: LOGIN_USER, payload: retryData });
				return retryData;
			} catch (refreshError) {
				dispatch({ type: LOGIN_FAILURE, payload: refreshError.message });
			}
		} else {
			dispatch({ type: LOGIN_FAILURE, payload: error.message });
		}
	}
};

export const fetchUserData = () => async (dispatch: Dispatch) => {
	const accessToken = localStorage.getItem('accessToken');

	try {
		const userData: ServerResponse<any> = await fetchWithRefresh(`${baseURL}auth/user`, {
			method: 'GET',
			headers: {
				Authorization: accessToken || '',
			},
		});

		dispatch({ type: DATA_CHECK_USER, payload: userData });
		return userData;
	} catch (error) {
		// console.error('Ошибка при получении данных пользователя:', error);
		dispatch({ type: DATA_FETCH_ERROR, payload: error.message });
	}
};

export const refreshToken = async (): Promise<ServerResponse<TokenResponse>> => {
	return fetch(`${baseURL}auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(checkResponse)
		.then((refreshData: ServerResponse<TokenResponse>) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.data?.refreshToken || '');
			localStorage.setItem('accessToken', refreshData.data?.accessToken || '');
			return refreshData;
		});
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
	try {
		const res = await fetch(url, options);
		return await checkResponse(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers = {
				...options.headers,
				authorization: refreshData.data?.accessToken || '',
			};
			const res = await fetch(url, options);
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
