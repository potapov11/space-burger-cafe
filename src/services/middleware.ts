import { TOrder } from '../utils/types';

const CONNECT_FEED = 'CONNECT_FEED';
const DISCONNECT_FEED = 'DISCONNECT_FEED';
const UPDATE_ORDERS = 'UPDATE_ORDERS';

interface ConnectFeedAction {
	type: typeof CONNECT_FEED;
	payload: { url: string; token?: string };
}

interface DisconnectFeedAction {
	type: typeof DISCONNECT_FEED;
}

interface UpdateOrdersAction {
	type: typeof UPDATE_ORDERS;
	payload: TOrder[];
}

type FeedActions = ConnectFeedAction | DisconnectFeedAction;

type Dispatch = (action: FeedActions) => void;

let socket: WebSocket | null = null;

export const ordersSocketMiddleware = (wsUrl: string): Middleware => {
	let socket: WebSocket | null = null;

	return (store: MiddlewareAPI<Dispatch>) => {
		return (next) => (action: TWSActions) => {
			const { dispatch } = store;
			const { type, payload } = action;

			switch (type) {
				case CONNECT_FEED: {
					if (socket) {
						console.warn('WebSocket уже подключен'); // Предупреждение, если сокет уже открыт
						return;
					}

					const socketUrl = payload; // Используем URL из payload
					socket = new WebSocket(socketUrl);

					socket.onopen = () => {};

					socket.onmessage = (event) => {
						const data = JSON.parse(event.data);

						if (data.success) {
							const orders = data.orders.filter((order) => order && order._id);

							dispatch({ type: 'UPDATE_ORDERS', payload: orders });
							dispatch({ type: 'UPDATE_TOTAL', payload: data.total });
							dispatch({ type: 'UPDATE_TOTAL_TODAY', payload: data.totalToday });
						} else {
							console.error('Ошибка:', data.message);
							if (data.message === 'Invalid or missing token') {
								dispatch({ type: 'TOKEN_INVALID' });
							}
						}
					};

					socket.onerror = (error) => {
						console.error('WebSocket error:', error);
					};

					socket.onclose = () => {
						socket = null; // Освобождаем сокет
					};

					break;
				}

				case DISCONNECT_FEED: {
					if (socket) {
						socket.close();
						socket = null; // Освобождаем сокет
					}
					break;
				}

				default:
					break;
			}

			return next(action);
		};
	};
};
