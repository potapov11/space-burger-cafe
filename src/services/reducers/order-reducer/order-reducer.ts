import { ADD_ORDER_DETAIL, CLEAR_ORDER_DETAIL, ORDER_SUCCESS, ORDER_FAILURE } from '../../../utils/vars';
import { ItemConstructor } from '../../../utils/types';

interface OrderState {
	order: ItemConstructor[] | null;
	loading: boolean;
	error: string | null;
}

// Определите типы действий
interface AddOrderDetailAction {
	type: typeof ADD_ORDER_DETAIL;
}

interface OrderSuccessAction {
	type: typeof ORDER_SUCCESS;
	payload: ItemConstructor[];
}

interface OrderFailureAction {
	type: typeof ORDER_FAILURE;
	payload: string;
}

interface ClearOrderDetailAction {
	type: typeof CLEAR_ORDER_DETAIL;
}

type OrderAction = AddOrderDetailAction | OrderSuccessAction | OrderFailureAction | ClearOrderDetailAction;

export const initialState: OrderState = {
	order: null,
	loading: false,
	error: null,
};

export const orderReducer = (state = initialState, action: OrderAction): OrderState => {
	switch (action.type) {
		case ADD_ORDER_DETAIL:
			return { ...state, loading: true, error: null };
		case ORDER_SUCCESS:
			return { ...state, loading: false, order: (action as OrderSuccessAction).payload, error: null };
		case ORDER_FAILURE:
			return { ...state, loading: false, error: (action as OrderFailureAction).payload };
		case CLEAR_ORDER_DETAIL:
			return initialState;
		default:
			return state;
	}
};
