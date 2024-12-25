import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectFeed, disconnectFeed } from '../../services/actions/socket-action';
import FeedListOrdersCss from './FeedListOrders.module.css';
import FeedListOrder from '../FeedListOrder/FeedListOrder';
import { FEED_SOCKET_URL } from '../../utils/vars';

const FeedListOrders = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Подключение к WebSocket
		dispatch(connectFeed(FEED_SOCKET_URL));

		// Очистка при размонтировании компонента
		return () => {
			dispatch(disconnectFeed());
		};
	}, [dispatch]);

	return (
		<div>
			<ul className={FeedListOrdersCss.list}>
				<FeedListOrder />
				<FeedListOrder />
				<FeedListOrder />
				<FeedListOrder />
				<FeedListOrder />
			</ul>
		</div>
	);
};

export default FeedListOrders;
