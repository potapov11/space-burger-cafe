// import { TOrder } from "../../utils/types";

// const CONNECT_FEED = "CONNECT_FEED";
// const DISCONNECT_FEED = "DISCONNECT_FEED";
// const UPDATE_ORDERS = "UPDATE_ORDERS";

// interface ConnectFeedAction {
//   type: typeof CONNECT_FEED;
//   payload: WebSocket;
// }

// interface DisconnectFeedAction {
//   type: typeof DISCONNECT_FEED;
// }

// interface UpdateOrdersAction {
//   type: typeof UPDATE_ORDERS;
//   payload: TOrder[];
// }

// type FeedActions = ConnectFeedAction | DisconnectFeedAction | UpdateOrdersAction;

// type Dispatch = (action: FeedActions) => void;

// type GetState = () => { feedSocket?: WebSocket };

// export const connectFeed = (url: string) => {
//   return (dispatch: Dispatch) => {
//     const socket = new WebSocket(url);

//     socket.onopen = () => {
//       console.log("WebSocket connected");
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       dispatch({ type: UPDATE_ORDERS, payload: data });
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     socket.onclose = () => {
//       console.log("WebSocket closed");
//     };

//     dispatch({ type: CONNECT_FEED, payload: socket });
//   };
// };

// export const disconnectFeed = () => {
//   return (dispatch: Dispatch, getState: GetState) => {
//     const state = getState();
//     const socket = state.feedSocket;
//     if (socket) {
//       socket.close();
//       dispatch({ type: DISCONNECT_FEED });
//     }
//   };
// };

const CONNECT_FEED = "CONNECT_FEED";
const DISCONNECT_FEED = "DISCONNECT_FEED";
// const UPDATE_ORDERS = "UPDATE_ORDERS";

export const connectFeed = (url: string, token?: string) => ({
  type: CONNECT_FEED,
  payload: { url, token },
});

export const disconnectFeed = () => ({
  type: DISCONNECT_FEED,
});
