import orderDetailCss from './OrderDetailCss.module.css';

const OrderDetail = () => {
	return (
		<div className={orderDetailCss.orderDetail}>
			<p className="text text_type_digits-large">034536</p>
			<p className="text text_type_main-default">идентификатор заказа</p>
			<div className={orderDetailCss.done}></div>
			<div className={orderDetailCss.subInfo}>
				<p className="text text_type_main-default">Ваш заказ начали готовить</p>
				<p className="text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
			</div>
		</div>
	);
};

export default OrderDetail;
