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

function formatDate(dateString: string): string {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
	const formattedDate = date.toLocaleDateString('ru-RU', options);
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${formattedDate}, ${hours}:${minutes}`;
}

export { formatDate };
