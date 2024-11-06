import { ADD_ODER_DETAIL, CLEAR_ORDER_DETAIL, ORDER_SUCCESS, ORDER_FAILURE } from '../../utils/vars';

const initialState = {
	order: null,
	loading: false,
	error: null,
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ODER_DETAIL:
			return { ...state, loading: true, error: null };
		case ORDER_SUCCESS:
			return { ...state, loading: false, order: action.payload, error: null };
		case ORDER_FAILURE:
			return { ...state, loading: false, error: action.payload };
		case CLEAR_ORDER_DETAIL:
			return initialState;
		default:
			return state;
	}
};

export default orderReducer;
