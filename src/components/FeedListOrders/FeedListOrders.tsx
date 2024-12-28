import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectFeed, disconnectFeed } from "../../services/actions/socket-action";
import FeedListOrdersCss from "./FeedListOrders.module.css";
import FeedListOrder from "../FeedListOrder/FeedListOrder";
import { OrderFeed } from "../../utils/types";
import { FEED_SOCKET_URL_All } from "../../utils/vars";
const MAX_ORDERS_COUNT = 5;

const FeedListOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = (localStorage.getItem("accessToken") || "").substring("Bearer ".length);
    dispatch(connectFeed({ url: FEED_SOCKET_URL_All, token })); // Передаем объект с URL и токеном
    return () => {
      dispatch(disconnectFeed()); // Отключение от WebSocket при размонтировании компонента
    };
  }, [dispatch]);

  const arrayAllOrdersSocket = useSelector((store) => store.feedReducer.orders.orders);
  const isLoadingOrders = useSelector((store) => store.feedReducer.isLoading);
  const slicedArrayOrders: OrderFeed[] = arrayAllOrdersSocket?.slice(0, MAX_ORDERS_COUNT);

  return (
    <div>
      {isLoadingOrders && <p className="text text_type_main-default">Заказы загружаются...</p>}
      {!isLoadingOrders && (
        <ul className={FeedListOrdersCss.list}>
          {slicedArrayOrders?.length > 0 &&
            slicedArrayOrders.map((item) => (
              <FeedListOrder
                key={item._id}
                _id={item._id}
                ingredients={item.ingredients}
                status={item.status}
                name={item.name}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                number={item.number}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default FeedListOrders;
