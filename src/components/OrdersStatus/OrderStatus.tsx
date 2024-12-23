import React from 'react';
import OrderStatusCss from './OrderStatus.module.css';
import OrderReady from '../OrdersReady/OrderReady';
import OrderInWorks from '../../components/OrdersInWork/OrderInWorks';

const styles = {
	height: '100px',
	width: '100%',
	border: '1px, solid, red',
	marginLeft: '60px',
};

const OrderStatus = (): React.JSX.Element => {
	return (
		<div style={styles}>
			<div className={OrderStatusCss.wrapper}>
				<OrderReady />
				<OrderInWorks />
			</div>
			<div>
				<p className="text text_type_main-medium">Выполнено за все время:</p>
				<p className="text text_type_digits-large">28 752</p>
			</div>
			<div>
				<p className="text text_type_main-medium">Выполнено за все время:</p>
				<p className="text text_type_digits-large">28 752</p>
			</div>
		</div>
	);
};

export default OrderStatus;
