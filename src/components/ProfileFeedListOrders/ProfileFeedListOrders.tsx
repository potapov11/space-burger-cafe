import React from 'react';
import ProfileFeedListOrdersCss from './ProfileFeedListOrders.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../main';
import { connectFeed, disconnectFeed } from '../../services/actions/socket-action';
import FeedListOrder from '../FeedListOrder/FeedListOrder';
import { OrderFeed } from '../../utils/types';
import { ORDERS_SOCKET } from '../../utils/vars';
const MAX_ORDERS_COUNT = 5;

const ProfileFeedListOrders = () => {
	const dispatch = useDispatch();
	const arrayAllOrdersSocket = useSelector((store) => store.orderSocketReducer.orders);
	const lengthArrBefore = arrayAllOrdersSocket?.length - MAX_ORDERS_COUNT;
	const slicedArrayOrders: OrderFeed[] = arrayAllOrdersSocket?.slice(lengthArrBefore, arrayAllOrdersSocket.length - 1);
	const isLoadingOrders = useSelector((store) => store.orderSocketReducer.isLoading);

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		const token = accessToken ? accessToken.split(' ')[1] : null;

		dispatch(connectFeed(`${ORDERS_SOCKET}?token=${token}`));
		return () => {
			dispatch(disconnectFeed());
		};
	}, [dispatch]);

	return (
		<div>
			{isLoadingOrders && <p className="text text_type_main-default">Заказы загружаются...</p>}

			{!isLoadingOrders && (
				<ul className={ProfileFeedListOrdersCss.list}>
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

export default ProfileFeedListOrders;
