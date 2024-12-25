const initialState = {
	feedSocket: null,
	orders: [],
};

const feedReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_ORDERS':
			return {
				...state,
				orders: action.payload,
			};
		case 'CONNECT_FEED':
			return {
				...state,
				feedSocket: action.payload,
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

export default feedReducer;
