import React from 'react';
import PropTypes from 'prop-types';
import TotalPrice from '../TotalPrice/TotalPrice';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCss from './BurgerConstructor.module.css';
import { useSelector } from 'react-redux';
import bun from '../../images/ingredientImgs/bun.png';

const BurgerMainIngredients = ({ openModal }) => {
	const dataConstructor = useSelector((store) => store.constructorReducer.ingredients);

	return (
		<section>
			<div className="products">
				<div className={BurgerConstructorCss.productsWrapper}>
					<ConstructorElement extraClass={`${BurgerConstructorCss.mr14} mb-4`} type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={bun} />
					<ul className={`${BurgerConstructorCss.constructorList} mt-4`}>
						{dataConstructor?.length > 0 &&
							dataConstructor.map((item) => {
								return (
									<li className={`${BurgerConstructorCss.constructorListItem} mb-4`} key={item._id}>
										<DragIcon type="primary" />
										<ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
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
