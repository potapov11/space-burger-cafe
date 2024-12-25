const CONNECT_FEED = 'CONNECT_FEED';
const DISCONNECT_FEED = 'DISCONNECT_FEED';
const UPDATE_ORDERS = 'UPDATE_ORDERS';

export const connectFeed = (url) => {
	return (dispatch) => {
		const socket = new WebSocket(url);

		socket.onopen = () => {
			console.log('WebSocket connected');
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			dispatch({ type: UPDATE_ORDERS, payload: data });
		};

		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		socket.onclose = () => {
			console.log('WebSocket closed');
		};

		dispatch({ type: CONNECT_FEED, payload: socket });
	};
};

export const disconnectFeed = () => {
	return (dispatch, getState) => {
		const state = getState();
		const socket = state.feedSocket;
		if (socket) {
			socket.close();
			dispatch({ type: DISCONNECT_FEED });
		}
	};
};
