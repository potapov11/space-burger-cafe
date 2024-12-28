import { Dispatch, Middleware } from "redux";
// import { CONNECT_USER_ORDERS, DISCONNECT_USER_ORDERS, UPDATE_USER_ORDERS } from "./actionTypes"; // Импортируйте ваши типы действий

let socket: WebSocket | null = null;

const CONNECT_USER_ORDERS = "CONNECT_USER_ORDERS";
const DISCONNECT_USER_ORDERS = "DISCONNECT_FEED";
const UPDATE_USER_ORDERS = "UPDATE_ORDERS";

export const connectUserOrders = (url: string) => {
  return (dispatch: Dispatch) => {
    if (socket) {
      socket.close();
    }

    const token = (localStorage.getItem("accessToken") || "").substring("Bearer ".length);
    const socketUrl = token ? `${url}?token=${token}` : url;

    socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("WebSocket connected");
      dispatch({ type: CONNECT_USER_ORDERS });
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch({ type: UPDATE_USER_ORDERS, payload: data });
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      dispatch({ type: "USER_ORDERS_ERROR", payload: error });
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
      dispatch({ type: DISCONNECT_USER_ORDERS });
    };
  };
};

export const disconnectUserOrders = () => {
  return (dispatch: Dispatch) => {
    if (socket) {
      socket.close();
      socket = null;
      dispatch({ type: DISCONNECT_USER_ORDERS });
    }
  };
};

export const userOrdersWebsocketMiddleware: Middleware = (store) => (next) => (action) => {
  if (connectUserOrders.match(action)) {
    store.dispatch(connectUserOrders(action.payload));
  }

  if (disconnectUserOrders.match(action)) {
    store.dispatch(disconnectUserOrders());
  }

  return next(action);
};
