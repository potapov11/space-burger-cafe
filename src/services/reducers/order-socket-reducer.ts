import { TOrder } from "../../utils/types";

const initialState = {
  feedSocket: null,
  orders: [],
  isLoading: true,
};

interface FeedState {
  feedSocket: WebSocket | null;
  orders: TOrder[];
}

interface UpdateOrdersAction {
  type: "UPDATE_ORDERS";
  payload: TOrder[];
}

interface ConnectFeedAction {
  type: "CONNECT_FEED";
  payload: WebSocket;
}

interface DisconnectFeedAction {
  type: "DISCONNECT_FEED";
}

type FeedAction = UpdateOrdersAction | ConnectFeedAction | DisconnectFeedAction;

const orderSocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ORDERS":
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };
    case "CONNECT_FEED":
      return {
        ...state,
        isLoading: false,
        feedSocket: action.payload,
      };
    case "DISCONNECT_FEED":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default orderSocketReducer;
