import React from 'react';
import PropTypes from 'prop-types';
import TotalPrice from '../TotalPrice/TotalPrice';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCss from './BurgerConstructor.module.css';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { BUN_ITEM } from '../../utils/vars';

const BurgerMainIngredients = ({ openModal, handleDrop }) => {
	const dataConstructor = useSelector((store) => store.constructorReducer.constructorElems);
	let { bunItems, ingredients } = dataConstructor;
	const uniqId = React.useId();

	if (!bunItems) {
		bunItems = BUN_ITEM;
	}

	const [, dropTarget] = useDrop({
		accept: 'animal',
		drop(item) {
			handleDrop(item);
		},
	});

	const topBun = bunItems ? (
		<li className={`${BurgerConstructorCss.constructorListItem} mb-4`} key={uniqId}>
			<ConstructorElement extraClass={`${BurgerConstructorCss.mr14} mb-4`} type="top" isLocked={true} text={`${bunItems.name} (верх)`} price={bunItems.price} thumbnail={bunItems.image} />
		</li>
	) : null;

	const bottomBun = bunItems ? (
		<li className={`${BurgerConstructorCss.constructorListItem} mb-4`} key={uniqId}>
			<ConstructorElement extraClass={`${BurgerConstructorCss.mr14} mb-4`} type="bottom" isLocked={true} text={`${bunItems.name} (низ)`} price={bunItems.price} thumbnail={bunItems.image} />
		</li>
	) : null;

	console.log(bunItems, ingredients, '...bunItems, ingredients...');

	return (
		<section>
			<div className="products" ref={dropTarget}>
				<div className={BurgerConstructorCss.productsWrapper}>
					<ul className={`${BurgerConstructorCss.constructorList} mt-4`}>
						{topBun}
						{ingredients
							.filter((item) => item.type !== 'bun')
							.map((item, index) => (
								<li className={`${BurgerConstructorCss.constructorListItem} mb-4`} key={item._id || index}>
									<DragIcon type="primary" />
									<ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
								</li>
							))}
						{bottomBun}
					</ul>
				</div>
			</div>
			<TotalPrice openModal={openModal} />
		</section>
	);
};

BurgerMainIngredients.propTypes = {
	openModal: PropTypes.func.isRequired,
	handleDrop: PropTypes.func.isRequired,
};

export default BurgerMainIngredients;
