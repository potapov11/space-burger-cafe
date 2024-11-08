export const checkResponse = (res) => {
	if (!res.ok) {
		throw new Error(`Ошибка сетевого ответа ${res.status}`);
	}
	return res.json();
};
