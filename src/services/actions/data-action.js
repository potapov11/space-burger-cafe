import { baseURL, SET_MAIN_ARRAY, SET_SAUCE_ARRAY, SET_ROLLS_ARRAY, ORDER_SUCCESS, ORDER_FAILURE, EMAIL_SUCCESS, EMAIL_FAILURE } from '../../utils/vars';
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
