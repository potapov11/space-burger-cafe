const initialState = {
	feedSocket: null,
	orders: [],
	total: '',
	total_today: '',
};

const feedReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_ORDERS':
			return {
				...state,
				orders: action.payload,
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
			};
		case 'DISCONNECT_FEED':
			return {
				...state,
			};
		default:
			return state;
	}
};

export default feedReducer;
