import React from 'react';
import FeedListOrdersCss from './FeedListOrders.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../main';
import { connectFeed, disconnectFeed } from '../../services/actions/socket-action';
import FeedListOrder from '../FeedListOrder/FeedListOrder';
import { OrderFeed } from '../../utils/types';
import { ORDERS_SOCKET } from '../../utils/vars';
const MAX_ORDERS_COUNT = 5;

const FeedListOrders = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(connectFeed(`${ORDERS_SOCKET}/all`)); // Передаем только URL
		return () => {
			dispatch(disconnectFeed());
		};
	}, [dispatch]);

	const arrayAllOrdersSocket = useSelector((store) => store.orderSocketReducer.orders);
	const isLoadingOrders = useSelector((store) => store.feedReducer.isLoading);
	const slicedArrayOrders: OrderFeed[] = arrayAllOrdersSocket?.slice(0, MAX_ORDERS_COUNT);

	return (
		<div>
			{isLoadingOrders && <p className="text text_type_main-default">Заказы загружаются...</p>}
			{!isLoadingOrders && (
				<ul className={FeedListOrdersCss.list}>
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

export default FeedListOrders;
