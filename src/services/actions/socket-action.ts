export const CONNECT_FEED = "CONNECT_FEED";
export const DISCONNECT_FEED = "DISCONNECT_FEED";
export const UPDATE_ORDERS = "UPDATE_ORDERS";

export const connectFeed = (payload) => ({
  type: CONNECT_FEED,
  payload,
});

export const disconnectFeed = () => ({
  type: DISCONNECT_FEED,
});
