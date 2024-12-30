import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderInWorksCss from './OrderInWorks.module.css';

const OrderInWorks = (): React.JSX.Element => {
	const arrayAllOrdersSocket = useSelector((store) => store.orderSocketReducer.orders);
	const pendingOrders = arrayAllOrdersSocket?.filter((item) => item.status === 'pending').slice(0, 10);

	return (
		<div>
			<span className="text text_type_main-default">В работе:</span>
			<ul className={OrderInWorksCss.list}>{pendingOrders?.length > 0 && pendingOrders.map((item) => <li className={`${OrderInWorksCss.listItem} text text_type_main-default`}>{item.number}</li>)}</ul>
		</div>
	);
};

export default OrderInWorks;
