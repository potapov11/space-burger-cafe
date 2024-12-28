import { TOrder } from "../utils/types";

const CONNECT_FEED = "CONNECT_FEED";
const DISCONNECT_FEED = "DISCONNECT_FEED";
const UPDATE_ORDERS = "UPDATE_ORDERS";

interface ConnectFeedAction {
  type: typeof CONNECT_FEED;
  payload: { url: string; token?: string };
}

interface DisconnectFeedAction {
  type: typeof DISCONNECT_FEED;
}

interface UpdateOrdersAction {
  type: typeof UPDATE_ORDERS;
  payload: TOrder[];
}

type FeedActions = ConnectFeedAction | DisconnectFeedAction;

type Dispatch = (action: FeedActions) => void;

type GetState = () => { feedSocket?: WebSocket };

let socket: WebSocket | null = null;

export const websocketMiddleware = (store: any) => (next: Dispatch) => (action: FeedActions) => {
  switch (action.type) {
    case CONNECT_FEED: {
      console.log("herererrererrer");

      const { url, token } = action.payload;
      if (socket) {
        socket.close();
      }

      console.log(url, token, "token token rerrer");

      const socketUrl = token ? `${url}?token=${token}` : url;
      socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        store.dispatch({ type: UPDATE_ORDERS, payload: data });
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket closed");
      };

      break;
    }

    case DISCONNECT_FEED: {
      if (socket) {
        socket.close();
        socket = null;
      }
      break;
    }

    default:
      break;
  }

  return next(action);
};
