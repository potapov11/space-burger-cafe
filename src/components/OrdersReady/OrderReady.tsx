import React from 'react';
import OrderReadyCss from './OrderReady.module.css';
import { useSelector } from '../../main';

const OrderReady = (): React.JSX.Element => {
	const arrayAllOrdersSocket = useSelector((store) => store.orderSocketReducer.orders);
	const doneOrders = arrayAllOrdersSocket?.filter((item) => item.status === 'done').slice(0, 10);

	return (
		<div>
			<span className="text text_type_main-default">Готовы:</span>
			<ul className={OrderReadyCss.list}>{doneOrders?.length > 0 && doneOrders.map((item) => <li className={`${OrderReadyCss.listItem} text text_type_main-default`}>{item.number}</li>)}</ul>
		</div>
	);
};

export default OrderReady;
