import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectUserOrders, disconnectUserOrders } from "../../services/actions/order-socket-action";
import ProfileFeedListOrdersCss from "./ProfileFeedListOrders.module.css";
import FeedListOrder from "../FeedListOrder/FeedListOrder";
import { OrderFeed } from "../../utils/types";
import { USER_ORDERS_SOCKET_URL } from "../../utils/vars";
const MAX_ORDERS_COUNT = 5;

const ProfileFeedListOrders = () => {
  const dispatch = useDispatch();
  const arrayAllOrdersSocket = useSelector((store) => store.orderSocketReducer.orders.orders);
  const lengthArrBefore = arrayAllOrdersSocket?.length - MAX_ORDERS_COUNT;
  const slicedArrayOrders: OrderFeed[] = arrayAllOrdersSocket?.slice(lengthArrBefore, arrayAllOrdersSocket.length - 1);
  const isLoadingOrders = useSelector((store) => store.orderSocketReducer.isLoading);

  console.log(arrayAllOrdersSocket, "..arrayAllOrders.ProfileFeedListOrders..");

  useEffect(() => {
    dispatch(connectUserOrders(USER_ORDERS_SOCKET_URL));
    return () => {
      dispatch(disconnectUserOrders());
    };
  }, [dispatch]);

  return (
    <div>
      {isLoadingOrders && <p className="text text_type_main-default">Заказы загружаются...</p>}

      {!isLoadingOrders && (
        <ul className={ProfileFeedListOrdersCss.list}>
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

export default ProfileFeedListOrders;
