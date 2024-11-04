import { serverURL, SET_MAIN_ARRAY, SET_SAUCE_ARRAY, SET_ROLLS_ARRAY } from '../../utils/vars';

export const fetchServerData = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(serverURL);

			if (!response.ok) {
				throw new Error(`Ошибка сетевого ответа ${response.status}`);
			}

			const data = await response.json();

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
