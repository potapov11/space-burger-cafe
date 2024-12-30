import React, { useEffect } from 'react';
import OrderModalCss from './OrderModal.module.css';
import { connectFeed, disconnectFeed } from '../../services/actions/socket-action';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/utils';
import { ORDERS_SOCKET } from '../../utils/vars';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import { FEED_SOCKET_URL_All } from '../../utils/vars';

const OrderInfo = ({ styleCenter }: { styleCenter?: boolean }): React.JSX.Element => {
	const { orderId } = useParams();
	const dispatch = useDispatch();
	const { mainArray, rollsArray, sauceArray } = useSelector((store) => store.data);
	const concatedArrayIngredients = [...mainArray, ...rollsArray, ...sauceArray];

	useEffect(() => {
		// Подключаемся к WebSocket без токена
		dispatch(connectFeed({ url: `${ORDERS_SOCKET}/all` })); // Передаем только URL
		return () => {
			dispatch(disconnectFeed()); // Отключение от WebSocket при размонтировании компонента
		};
	}, [dispatch]);

	const Store = useSelector((store) => store);
	console.log(Store, '...Store in OrderInfo');

	const arrayAllOrdersSocket = useSelector((store) => store.orderSocketReducer.orders);
	const selectedOrder = arrayAllOrdersSocket?.find((socketItem) => socketItem._id === orderId);

	if (!selectedOrder) {
		return <p>Заказ не найден.</p>;
	}

	const ingredients = selectedOrder.ingredients;
	const quantity = ingredients.reduce((acc, ingredientId) => {
		acc[ingredientId] = (acc[ingredientId] || 0) + 1;
		return acc;
	}, {});

	const targetArrElements = concatedArrayIngredients
		.filter((item) => ingredients.includes(item._id))
		.map((item) => ({
			...item,
			quantity: item.type === 'bun' ? 0 : quantity[item._id] || 0,
		}));

	const totalCost = ingredients.reduce((sum, id) => {
		const ingredient = targetArrElements.find((item) => item._id === id);
		return ingredient ? sum + ingredient.price : sum;
	}, 0);

	return (
		<div className={styleCenter ? OrderModalCss.otherPage : OrderModalCss.modalWrapper}>
			<p className={`${OrderModalCss.textCenter} text text_type_digits-default`}>#{selectedOrder.number}</p>
			<p className="text text_type_main-medium">{selectedOrder.name}</p>
			<p className={`${OrderModalCss.textStatus} text text_type_main-default`}>{selectedOrder.status}</p>
			<div className={OrderModalCss.wrapper}>
				<p className="text text_type_main-default">Состав :</p>
				<ul className={OrderModalCss.list}>
					{targetArrElements.map((item) => (
						<li key={item._id} className={OrderModalCss.item}>
							<div className={OrderModalCss.imgWrapper}>
								<img src={item.image} alt={item.name} />
							</div>
							<p className="text text_type_main-default">{item.name}</p>
							<div className={OrderModalCss.priceWrapper}>
								{item.type === 'bun' ? <span className="text text_type_digits-default">2</span> : <span className="text text_type_digits-default">{item.quantity}</span>}
								<span>Х</span>
								<span className="text text_type_digits-default">{item.price}</span>
								<span>
									<CurrencyIcon type="primary" />
								</span>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className={OrderModalCss.bottomWrapper}>
				<span className={`text text_type_main-default`}>{formatDate(selectedOrder.createdAt)}</span>
				<div className={OrderModalCss.priceWrapper}>
					<CurrencyIcon type="primary" />
					<span className="text text_type_digits-default">{totalCost}</span>
				</div>
			</div>
		</div>
	);
};

export default OrderInfo;
