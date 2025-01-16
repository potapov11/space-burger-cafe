import { CLEAR_ORDER_DETAIL, ADD_ORDER_DETAIL, ORDER_SUCCESS, ORDER_FAILURE } from '../../utils/vars';

interface AddOrderDetailAction {
	type: typeof ADD_ORDER_DETAIL;
}

interface OrderSuccessAction {
	type: typeof ORDER_SUCCESS;
}

interface OrderFailureAction {
	type: typeof ORDER_FAILURE;
}

interface ClearOrderDetailAction {
	type: typeof CLEAR_ORDER_DETAIL;
}

const addOrderDetail = (): AddOrderDetailAction => ({
	type: ADD_ORDER_DETAIL,
});

const orderSuccess = (): OrderSuccessAction => ({
	type: ORDER_SUCCESS,
});

const orderFailure = (): OrderFailureAction => ({
	type: ORDER_FAILURE,
});

const clearOrderDetail = (): ClearOrderDetailAction => ({
	type: CLEAR_ORDER_DETAIL,
});

export { addOrderDetail, clearOrderDetail, orderSuccess, orderFailure };
export type TOrderActions = AddOrderDetailAction | OrderSuccessAction | OrderFailureAction | ClearOrderDetailAction;
