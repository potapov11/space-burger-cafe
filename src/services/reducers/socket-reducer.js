const initialState = {
	feedSocket: null,
	orders: [],
	isLoading: true,
};

const socketFeedReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_ORDERS':
			return {
				...state,
				orders: action.payload,
				isLoading: false,
			};
		case 'CONNECT_FEED':
			return {
				...state,
				feedSocket: action.payload,
				isLoading: true,
			};
		case 'DISCONNECT_FEED':
			return {
				...state,
				feedSocket: null,
			};
		default:
			return state;
	}
};

export default socketFeedReducer;
