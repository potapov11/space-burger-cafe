import React from 'react';
import OrderStatusCss from './OrderStatus.module.css';
import OrderReady from '../OrdersReady/OrderReady';
import { useSelector } from '../../main';
import OrderInWorks from '../../components/OrdersInWork/OrderInWorks';

const OrderStatus = (): React.JSX.Element => {
	const OrdersSocketTotal = useSelector((store) => store.orderSocketReducer.total);
	const OrdersSockettotalToday = useSelector((store) => store.orderSocketReducer.total_today);

	return (
		<div className={OrderStatusCss.box}>
			<div className={OrderStatusCss.wrapper}>
				<OrderReady />
				<OrderInWorks />
			</div>
			<div className={OrderStatusCss.boxTop}>
				<p className="text text_type_main-medium">Выполнено за все время:</p>
				<p className="text text_type_digits-large">{OrdersSocketTotal}</p>
			</div>
			<div>
				<p className="text text_type_main-medium">Выполнено за сегодня:</p>
				<p className="text text_type_digits-large">{OrdersSockettotalToday}</p>
			</div>
		</div>
	);
};

export default OrderStatus;
