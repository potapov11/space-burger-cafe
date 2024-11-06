import { CLEAR_ORDER_DETAIL, ADD_ORDER_DETAIL } from '../../utils/vars';

const addOrderDetail = (ingredient) => ({
	type: ADD_ORDER_DETAIL,
	payload: ingredient,
});

const clearOrderDetail = () => ({
	type: CLEAR_ORDER_DETAIL,
});

export { addOrderDetail, clearOrderDetail };
