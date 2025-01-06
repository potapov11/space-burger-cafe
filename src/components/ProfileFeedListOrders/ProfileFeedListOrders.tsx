import React from 'react';
import ProfileFeedListOrdersCss from './ProfileFeedListOrders.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../main';
import { WS_AUTH_CONNECTION_CLOSED, WS_AUTH_CONNECTION_START } from '../../services/actions/socket-action';
import FeedListOrder from '../FeedListOrder/FeedListOrder';
import { OrderFeed } from '../../utils/types';
const MAX_ORDERS_COUNT = 5;

const ProfileFeedListOrders = () => {
	const dispatch = useDispatch();
	const userSocketOrders = useSelector((store) => store.orderSocketReducer.userOrders);

	const lengthArrBefore = userSocketOrders?.length - MAX_ORDERS_COUNT;
	const slicedArrayOrders: OrderFeed[] = userSocketOrders?.slice(lengthArrBefore, userSocketOrders.length - 1);
	const isLoadingOrders = useSelector((store) => store.orderSocketReducer.isLoading);

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		const token = accessToken ? accessToken.split(' ')[1] : null;
		dispatch({ type: WS_AUTH_CONNECTION_START, payload: `?token=${token}` });
		return () => {
			dispatch({ type: WS_AUTH_CONNECTION_CLOSED });
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
