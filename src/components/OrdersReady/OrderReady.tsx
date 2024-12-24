import React from 'react';
import OrderReadyCss from './OrderReady.module.css';

const OrderReady = (): React.JSX.Element => {
	return (
		<div>
			<span className="text text_type_main-default">Готовы:</span>
			<ul className={OrderReadyCss.list}>
				<li className={`${OrderReadyCss.listItem} text text_type_main-default`}>034533</li>
				<li className={`${OrderReadyCss.listItem} text text_type_main-default`}>034533</li>
				<li className={`${OrderReadyCss.listItem} text text_type_main-default`}>034533</li>
				<li className={`${OrderReadyCss.listItem} text text_type_main-default`}>034533</li>
				<li className={`${OrderReadyCss.listItem} text text_type_main-default`}>034533</li>
				<li className={`${OrderReadyCss.listItem} text text_type_main-default`}>034533</li>
			</ul>
		</div>
	);
};

export default OrderReady;
