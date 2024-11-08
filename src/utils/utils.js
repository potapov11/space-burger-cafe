export const checkResponse = (res) => {
	if (!res.ok) {
		throw new Error(`Ошибка сетевого ответа ${res.status}`);
	}
	return res.json();
};

const isEmpty = (value) => value === null || (Array.isArray(value) && value.length === 0);
export default isEmpty;
