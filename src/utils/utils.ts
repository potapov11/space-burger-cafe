interface Item {
	price: number;
}

export const checkResponses = <T>(res: Response): Promise<T> => {
	if (!res.ok) {
		throw new Error(`Ошибка сетевого ответа ${res.status}`);
	}
	return res.json();
};

const isEmpty = <T>(value: T | null): value is T => {
	return value === null || (Array.isArray(value) && value.length === 0);
};

export default isEmpty;

export function calculateTotalPrice(items: Item[]): number {
	return items.reduce((total, item) => total + item.price, 0);
}
