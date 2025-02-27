import React from 'react';
import FeedListOrderCss from './FeedListOrderCss.module.css';
import { useSelector } from '../../main';
import { Link, useLocation } from 'react-router-dom';
import { IWSOrder } from '../../utils/types';
import { formatDate } from '../../utils/utils';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const FeedListOrder: React.FC<IWSOrder> = ({ _id, ingredients, name, createdAt, number }): React.JSX.Element => {
	const { mainArray, rollsArray, sauceArray } = useSelector((store) => store.data);
	const concatedArrayIngredients = [...mainArray, ...rollsArray, ...sauceArray];
	const location = useLocation();

	const targetUrl = location.pathname;

	const quantity = {};

	for (let i = 0; i < ingredients.length; i++) {
		const ingredientId = ingredients[i];
		if (quantity[ingredientId]) {
			quantity[ingredientId] += 1;
		} else {
			quantity[ingredientId] = 1;
		}
	}

	const targetArrElements = concatedArrayIngredients
		.filter((item) => {
			return ingredients.some((someItem) => item._id === someItem);
		})
		.map((item) => {
			if (item.type === 'bun') {
				return {
					...item,
					quantity: 0,
				};
			}
			return {
				...item,
				quantity: quantity[item._id] || 0,
			};
		});

	const totalCost = ingredients.reduce((sum, id) => {
		const ingredient = targetArrElements.find((item) => item._id === id);
		return ingredient ? sum + ingredient.price : sum;
	}, 0);

	return (
		<Link className={FeedListOrderCss.link} key={_id} to={`${targetUrl}/${_id}`} state={{ background: location }}>
			<li key={_id} className={FeedListOrderCss.Item}>
				<div className={FeedListOrderCss.textDate}>
					<span className={`${FeedListOrderCss.textName} text text_type_main-default`}>#{number}</span>
					<span className="text text_type_main-default text_color_inactive">{formatDate(createdAt)}</span>
				</div>
				<div className={FeedListOrderCss.textName}>
					<p className="text text_type_main-default">{name}</p>
				</div>
				<div className={FeedListOrderCss.ingredients}>
					<ul className={FeedListOrderCss.imgsWrapper}>
						{targetArrElements &&
							targetArrElements.map((item, i) => {
								return (
									<li key={i} className={FeedListOrderCss.imgWrapper}>
										<img className={FeedListOrderCss.img} src={item.image} alt={item.name} />
										{item.quantity > 1 && <span className={`${FeedListOrderCss.imgSpan} text text_type_digits-default`}>{item.quantity}</span>}
									</li>
								);
							})}
					</ul>
					<div className={FeedListOrderCss.sumWrapper}>
						<CurrencyIcon type="primary" />
						<span className="text text_type_digits-default">{totalCost}</span>
					</div>
				</div>
			</li>
		</Link>
	);
};

export default FeedListOrder;
