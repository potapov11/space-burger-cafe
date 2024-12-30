import React from 'react';
import OrderReadyCss from './OrderReady.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { connectUserOrders, disconnectUserOrders } from '../../services/actions/order-socket-action';
import { connectFeed, disconnectFeed } from '../../services/actions/socket-action';
// import { FEED_SOCKET_URL_All } from "../../utils/vars";
// import { USER_ORDERS_SOCKET_URL } from "../../utils/vars";

const OrderReady = (): React.JSX.Element => {
	const arrayAllOrdersSocket = useSelector((store) => store.orderSocketReducer.orders.orders);
	const doneOrders = arrayAllOrdersSocket?.filter((item) => item.status === 'done').slice(0, 10);

	return (
		<div>
			<span className="text text_type_main-default">Готовы:</span>
			<ul className={OrderReadyCss.list}>{doneOrders?.length > 0 && doneOrders.map((item) => <li className={`${OrderReadyCss.listItem} text text_type_main-default`}>{item.number}</li>)}</ul>
		</div>
	);
};

export default OrderReady;
