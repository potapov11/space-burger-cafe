import React from 'react';
import FeedListOrderCss from './FeedListOrderCss.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { OrderFeed } from '../../utils/types';
import { formatDate } from '../../utils/utils';
import img from '../../images/ingredientImgs/bun-small.png';
const mockId = 10;

const FeedListOrder: React.FC<OrderFeed> = ({ _id, ingredients, status, name, createdAt, updatedAt, number }): React.JSX.Element => {
	const { mainArray, rollsArray, sauceArray } = useSelector((store) => store.data);
	const concatedArray = [...mainArray, ...rollsArray, ...sauceArray];

	const targetArrElements = concatedArray.filter((item) => {
		return ingredients.some((someItem) => item._id == someItem);
	});

	const location = useLocation();
	return (
		<Link className={FeedListOrderCss.link} to={`/profile/orders/${mockId}`} state={{ background: location }}>
			<li key={_id} className={FeedListOrderCss.Item}>
				<div className={FeedListOrderCss.textDate}>
					<span className={`${FeedListOrderCss.textName} text text_type_main-default`}>#{number}</span>
					<span className="text text_type_main-default text_color_inactive">{formatDate(createdAt)}</span>
				</div>
				<div className={FeedListOrderCss.textName}>
					<p className="text text_type_main-default">{name}</p>
				</div>
				<div className={FeedListOrderCss.ingredients}>
					<div className={FeedListOrderCss.imgsWrapper}>
						{targetArrElements &&
							targetArrElements.map((item) => {
								return (
									<div className={FeedListOrderCss.imgWrapper}>
										<img className={FeedListOrderCss.img} src={item.image} alt={item.name} />
									</div>
								);
							})}
					</div>
				</div>
			</li>
		</Link>
	);
};

export default FeedListOrder;
