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
import { AppThunk, AppDispatch } from '../../utils/types.ts';
import { checkResponses } from '../../utils/utils.ts';
import { ItemConstructor, serverResponseResetPassword, IUser } from '../../utils/types.ts';

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

interface OrderData {
	orderId: string;
	items: ItemConstructor[];
}

// Типы действий
type SetMainArrayAction = Action<ItemConstructor[]>;
type SetSauceArrayAction = Action<ItemConstructor[]>;
type SetRollsArrayAction = Action<ItemConstructor[]>;
type OrderSuccessAction = Action<ServerResponse<OrderData>>;
type OrderFailureAction = Action<string>;
type EmailSuccessAction = Action<ServerResponse<{ email: string }>>;
type EmailFailureAction = Action<string>;
type RegisterUserAction = Action<ServerResponse<TokenResponse>>;
type RegisterFailureAction = Action<string>;
type LoginUserAction = Action<ServerResponse<TokenResponse>>;
type LoginFailureAction = Action<string>;
type DataFetchErrorAction = Action<string>;
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
	| DataFetchErrorAction
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

export const fetchUserData = (): AppThunk => async (dispatch: AppDispatch) => {
	const accessToken = localStorage.getItem('accessToken');

	try {
		const userData = await fetchWithRefresh(`${baseURL}auth/user`, {
			method: 'GET',
			headers: {
				Authorization: accessToken || '',
			},
		});

		dispatch({ type: DATA_CHECK_USER, payload: userData });
	} catch (error) {
		dispatch({ type: DATA_FETCH_ERROR, payload: error.message });
	}
};

export const fetchServerData = (): AppThunk => async (dispatch: AppDispatch) => {
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

export const createOrder =
	(ingredients: string[]): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await fetch(`${baseURL}orders`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: localStorage.getItem('accessToken') || '',
				},
				body: JSON.stringify({ ingredients }),
			});

			const data: ServerResponse<ItemConstructor[]> = await checkResponses(response);
			dispatch({ type: ORDER_SUCCESS, payload: data });

			return data;
		} catch (error) {
			dispatch({ type: ORDER_FAILURE, payload: error.message });
		}
	};

export const resetPassword =
	(email: string): AppThunk =>
	async (dispatch: AppDispatch) => {
		const sendObject = { email };

		try {
			const response = await fetch(`${baseURL}password-reset`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(sendObject),
			});

			const data: ServerResponse<serverResponseResetPassword> = await checkResponses(response);
			dispatch({ type: EMAIL_SUCCESS, payload: data });

			return data;
		} catch (error) {
			dispatch({ type: EMAIL_FAILURE, payload: error.message });
		}
	};

export const resetPasswordReset =
	(obj: { password: string; token: string }): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await fetch(`${baseURL}password-reset/reset`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(obj),
			});

			const data: ServerResponse<serverResponseResetPassword> = await checkResponses(response);
			dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });

			return data;
		} catch (error) {
			dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
		}
	};

export const registerFunc =
	(object: { email: string; password: string; name: string }): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await fetch(`${baseURL}auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(object),
			});

			const data = await checkResponse(response);

			if (data.success) {
				localStorage.setItem('refreshToken', data.data?.refreshToken || '');
			}

			dispatch({ type: REGISTER_USER, payload: data });
			return data;
		} catch (error) {
			dispatch({ type: REGISTER_FAILURE, payload: error.message });
		}
	};

export const logOutFunc = (): AppThunk => async (dispatch: AppDispatch) => {
	try {
		const response = await fetch(`${baseURL}auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
		});

		const data = await checkResponse(response);

		dispatch({ type: LOGOUT_USER, payload: data });
		return data;
	} catch (error) {
		dispatch({ type: LOGOUT_FAILURE, payload: error.message });
	}
};

export const loginFunc =
	(object: { email: string; password: string }): AppThunk =>
	(dispatch: AppDispatch) => {
		return fetch(`${baseURL}auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(object),
		})
			.then((response) => checkResponse(response))
			.then((data) => {
				if (data.success) {
					localStorage.setItem('refreshToken', data.refreshToken || '');
					localStorage.setItem('accessToken', data.accessToken || '');
				}
				dispatch({ type: LOGIN_USER, payload: data });
				return data;
			})
			.catch((error) => {
				if (error.message === 'jwt expired') {
					return refreshToken()
						.then((refreshData) => {
							return fetch(`${baseURL}auth/login`, {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
									Authorization: `Bearer ${refreshData.data?.accessToken || ''}`,
								},
								body: JSON.stringify(object),
							});
						})
						.then((retryResponse) => checkResponse(retryResponse))
						.then((retryData) => {
							dispatch({ type: LOGIN_USER, payload: retryData });
							return retryData;
						})
						.catch((refreshError) => {
							dispatch({ type: LOGIN_FAILURE, payload: refreshError.message });
						});
				} else {
					dispatch({ type: LOGIN_FAILURE, payload: error.message });
				}
			});
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
