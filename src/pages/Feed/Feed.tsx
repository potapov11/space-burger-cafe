import React from 'react';
import feedCss from './Feed.module.css';
import FeedListOrders from '../../components/FeedListOrders/FeedListOrders';
import OrderStatus from '../../components/OrdersStatus/OrderStatus';

const Feed = (): React.JSX.Element => {
	return (
		<section className={feedCss.feedSection}>
			<div className={feedCss.container}>
				<h1 className="text text_type_main-large">Лента заказов</h1>
				<div className={feedCss.FeedBox}>
					<FeedListOrders />
					<OrderStatus />
					{/* <div style={styles}></div> */}
				</div>
			</div>
		</section>
	);
};

export default Feed;
