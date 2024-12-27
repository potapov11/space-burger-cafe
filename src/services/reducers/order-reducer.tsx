import { ADD_ORDER_DETAIL, CLEAR_ORDER_DETAIL, ORDER_SUCCESS, ORDER_FAILURE } from "../../utils/vars";

interface OrderState {
  order: null;
  loading: boolean;
  error: string | null;
}

// Определите типы действий
interface AddOrderDetailAction {
  type: typeof ADD_ORDER_DETAIL;
}

interface OrderSuccessAction {
  type: typeof ORDER_SUCCESS;
  payload: any; // Замените `any` на конкретный тип данных заказа
}

interface OrderFailureAction {
  type: typeof ORDER_FAILURE;
  payload: string; // Ошибка как строка
}

interface ClearOrderDetailAction {
  type: typeof CLEAR_ORDER_DETAIL;
}

// Объедините типы действий
type OrderAction = AddOrderDetailAction | OrderSuccessAction | OrderFailureAction | ClearOrderDetailAction;

// Начальное состояние
const initialState: OrderState = {
  order: null,
  loading: false,
  error: null,
};

// Редьюсер
const orderReducer = (state = initialState, action: OrderAction): OrderState => {
  switch (action.type) {
    case ADD_ORDER_DETAIL:
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
