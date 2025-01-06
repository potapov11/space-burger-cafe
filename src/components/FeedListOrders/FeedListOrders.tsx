import React from 'react';
import FeedListOrdersCss from './FeedListOrders.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../main';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/socket-action';
import FeedListOrder from '../FeedListOrder/FeedListOrder';
import { IWSOrder } from '../../utils/types';
const MAX_ORDERS_COUNT = 5;

const FeedListOrders = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: WS_CONNECTION_START, payload: `/all` });
		return () => {
			dispatch({ type: WS_CONNECTION_CLOSED });
		};
	}, [dispatch]);

	const arrayAllOrdersSocket = useSelector((store) => store.orderSocketReducer.orders);
	const slicedArrayOrders: IWSOrder[] = arrayAllOrdersSocket?.slice(0, MAX_ORDERS_COUNT);

	return (
		<div>
			{slicedArrayOrders?.length === 0 && <p className="text text_type_main-default">Заказы загружаются...</p>}

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
		</div>
	);
};

export default FeedListOrders;
