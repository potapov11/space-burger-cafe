import { CLEAR_ORDER_DETAIL, ADD_ORDER_DETAIL, ORDER_SUCCESS, ORDER_FAILURE } from '../../utils/vars';

const addOrderDetail = () => ({
	type: ADD_ORDER_DETAIL,
});

const orderSuccess = () => ({
	type: ORDER_SUCCESS,
});

const orderFailure = () => ({
	type: ORDER_FAILURE,
});

const clearOrderDetail = () => ({
	type: CLEAR_ORDER_DETAIL,
});

export { addOrderDetail, clearOrderDetail, orderSuccess, orderFailure };
