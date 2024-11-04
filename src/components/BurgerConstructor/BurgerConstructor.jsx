import React from 'react';
import PropTypes from 'prop-types';
import TotalPrice from '../TotalPrice/TotalPrice';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCss from './BurgerConstructor.module.css';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { BUN_ITEM } from '../../utils/vars';
import bun from '../../images/ingredientImgs/bun.png';

const BurgerMainIngredients = ({ openModal, handleDrop }) => {
	const dataConstructor = useSelector((store) => store.constructorReducer.ingredients);
	console.log(dataConstructor, '...current dataConstructor');

	// const someBun = dataConstructor.some((item) => item.item && item.item.type === 'bun');

	// console.log(someBun, '...someBun');
	// if(dataConstructor)
	// dataConstructor.unshift({ item: BUN_ITEM });
	// dataConstructor.push({ item: BUN_ITEM });

	const [, dropTarget] = useDrop({
		accept: 'animal',
		drop(item) {
			console.log(item, '...item...');
			handleDrop(item);
		},
	});

	return (
		<section>
			<div className="products" ref={dropTarget}>
				<div className={BurgerConstructorCss.productsWrapper}>
					<ConstructorElement extraClass={`${BurgerConstructorCss.mr14} mb-4`} type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={bun} />
					<ul className={`${BurgerConstructorCss.constructorList} mt-4`}>
						{dataConstructor?.length > 0 &&
							dataConstructor.map((item, index) => {
								return (
									<li className={`${BurgerConstructorCss.constructorListItem} mb-4`} key={item._id || item.item._id || index}>
										<DragIcon type="primary" />
										<ConstructorElement text={item.name || item.item.name} price={item.price || item.item.price} thumbnail={item.image || item.item.image} />
									</li>
								);
							})}
					</ul>
					<ConstructorElement extraClass={BurgerConstructorCss.mr14} type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={bun} />
				</div>
			</div>
			<TotalPrice openModal={openModal} />
		</section>
	);
};

BurgerMainIngredients.propTypes = {
	openModal: PropTypes.func,
};

export default BurgerMainIngredients;
