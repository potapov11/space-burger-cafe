import React from 'react';
import FeedListOrdersCss from './FeedListOrders.module.css';
import FeedListOrder from '../FeedListOrder/FeedListOrder';

const FeedListOrders = () => {
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
