import React from 'react';
import OrderInWorksCss from './OrderInWorks.module.css';

const OrderInWorks = (): React.JSX.Element => {
	return (
		<div>
			<span className="text text_type_main-default">Готовы:</span>
			<ul className={OrderInWorksCss.list}>
				<li className={`${OrderInWorksCss.listItem} text text_type_main-default`}>034533</li>
				<li className={`${OrderInWorksCss.listItem} text text_type_main-default`}>034533</li>
				<li className={`${OrderInWorksCss.listItem} text text_type_main-default`}>034533</li>
				<li className={`${OrderInWorksCss.listItem} text text_type_main-default`}>034533</li>
				<li className={`${OrderInWorksCss.listItem} text text_type_main-default`}>034533</li>
				<li className={`${OrderInWorksCss.listItem} text text_type_main-default`}>034533</li>
			</ul>
		</div>
	);
};

export default OrderInWorks;
