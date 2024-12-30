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

type GetState = () => { feedSocket?: WebSocket };

let socket: WebSocket | null = null;

export const ordersSocketMiddleware = (wsUrl: string, accessToken?: string): Middleware => {
	console.log(wsUrl, 'url в middleware');

	return (store: MiddlewareAPI<Dispatch>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: TWSActions) => {
			const { dispatch } = store;
			const { type, payload } = action;

			console.log(type, '...type в middleware');

			switch (type) {
				case CONNECT_FEED: {
					const socketUrl = payload.url; // Используем URL из payload
					socket = accessToken ? new WebSocket(`${socketUrl}?token=${accessToken}`) : new WebSocket(socketUrl);

					console.log(socketUrl, '...socketUrl в middleware');

					socket.onopen = () => {
						console.log('WebSocket connected');
					};

					socket.onmessage = (event) => {
						const data = JSON.parse(event.data);
						console.log(data, 'here');

						if (data.success) {
							const orders = data.orders.filter((order) => order && order._id);
							console.log(orders, '... orders в middleware');
							dispatch({ type: 'UPDATE_ORDERS', payload: orders });
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
						console.log('WebSocket closed');
						socket = null;
					};

					break;
				}

				case 'WS_CONNECTION_CLOSED': {
					if (socket) {
						socket.close();
						socket = null;
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
