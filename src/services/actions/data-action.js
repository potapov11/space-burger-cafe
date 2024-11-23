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
} from '../../utils/vars';

// import { getCookie, setCookie } from '../../utils/cookieUtils';

import { checkResponse } from '../../utils/utils';

export const fetchServerData = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${baseURL}ingredients`);
			const data = await checkResponse(response);

			if (data) {
				const rollsArray = data.data.filter((item) => item.type === 'bun');
				const sauceArray = data.data.filter((item) => item.type === 'sauce');
				const mainArray = data.data.filter((item) => item.type === 'main');

				dispatch({
					type: SET_ROLLS_ARRAY,
					payload: rollsArray,
				});
				dispatch({
					type: SET_SAUCE_ARRAY,
					payload: sauceArray,
				});
				dispatch({
					type: SET_MAIN_ARRAY,
					payload: mainArray,
				});
			}
		} catch (error) {
			console.error(`Произошла ошибка ${error}`);
		}
	};
};

export const createOrder = (ingredients) => async (dispatch) => {
	try {
		const response = await fetch(`${baseURL}orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients }),
		});

		const data = await checkResponse(response);
		dispatch({ type: ORDER_SUCCESS, payload: data });

		return data;
	} catch (error) {
		dispatch({ type: ORDER_FAILURE, payload: error.message });
	}
};

export const resetPassword = (email) => async (dispatch) => {
	const sendObject = {
		email: email,
	};

	try {
		const response = await fetch(`${baseURL}password-reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sendObject),
		});

		const data = await checkResponse(response);
		dispatch({ type: EMAIL_SUCCESS, payload: data });

		return data;
	} catch (error) {
		dispatch({ type: EMAIL_FAILURE, payload: error.message });
	}
};

// https://norma.nomoreparties.space/api/auth/register

export const registerFunc = (object) => async (dispatch) => {
	console.log(object, '...dataRegister.object.registerFunc.');

	try {
		const response = await fetch(`${baseURL}auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(object),
		});

		const data = await checkResponse(response);

		console.log(data, '...data');

		if (data.success) {
			localStorage.setItem('refreshToken', data.refreshToken);
		}

		dispatch({ type: REGISTER_USER, payload: data });
		return data;
	} catch (error) {
		dispatch({ type: REGISTER_FAILURE, payload: error.message });
	}
};

export const loginFunc = (object) => async (dispatch) => {
	console.log(object, '...dataRegister.object.loginFunc.');

	try {
		const response = await fetch(`${baseURL}auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(object),
		});

		const data = await checkResponse(response);

		if (data.success) {
			localStorage.setItem('refreshToken', data.refreshToken);
			localStorage.setItem('accessToken', data.accessToken);
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
						Authorization: `Bearer ${refreshData.accessToken}`,
					},
					body: JSON.stringify(object),
				});

				const retryData = await checkResponse(retryResponse);
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

export const checkAuth = () => {
	const accessToken = localStorage.getItem('accessToken');

	console.log(accessToken, '..accessToken.');

	if (accessToken) {
		fetchUserData(accessToken);
	} else {
		// Перенаправление на страницу авторизации
	}
};

//Здесь

export const fetchUserData = () => async (dispatch) => {
	const accessToken = localStorage.getItem('accessToken');

	console.log('fetchUserData');

	try {
		// Используем fetchWithRefresh для получения данных пользователя
		const userData = await fetchWithRefresh(`${baseURL}auth/user`, {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		});

		dispatch({ type: DATA_CHECK_USER, payload: userData });
		return userData;
	} catch (error) {
		console.error('Ошибка при получении данных пользователя:', error);
		dispatch({ type: DATA_FETCH_ERROR, payload: error.message });
	}
};

const checkReponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
	return fetch(`${baseURL}auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(checkReponse)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		});
};

export const fetchWithRefresh = async (url, options) => {
	console.log(options, '...options...');

	try {
		const res = await fetch(url, options);

		return await checkReponse(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
