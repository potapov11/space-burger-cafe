import { TOrder } from '../../utils/types';

const initialState = {
	orders: [],
	isLoading: true,
	total: '',
	total_today: '',
};

interface UpdateOrdersAction {
	type: 'UPDATE_ORDERS';
	payload: TOrder[];
}

interface ConnectFeedAction {
	type: 'CONNECT_FEED';
	payload: WebSocket;
}

interface DisconnectFeedAction {
	type: 'DISCONNECT_FEED';
}

const orderSocketReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_ORDERS':
			return {
				...state,
				orders: action.payload,
				isLoading: false,
			};
		case 'UPDATE_TOTAL':
			return {
				...state,
				total: action.payload,
			};
		case 'UPDATE_TOTAL_TODAY':
			return {
				...state,
				total_today: action.payload,
			};
		case 'CONNECT_FEED':
			return {
				...state,
				feedSocket: action.payload,
				isLoading: false,
			};
		case 'DISCONNECT_FEED':
			return {
				...state,
				isLoading: true,
			};
		default:
			return state;
	}
};

export default orderSocketReducer;
