import { TOrder } from "../../utils/types";

const initialState = {
  feedSocket: null,
  orders: [],
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

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    case "CONNECT_FEED":
      return {
        ...state,
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

export default feedReducer;
