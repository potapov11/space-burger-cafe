import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServerData } from '../../services/actions/data-action';

import ingredientCss from './BurgerIngredients.module.css';
import IngredientBox from '../IngredientBox/IngredientBox';

const BurgerIngredients = (props) => {
	const [current, setCurrent] = React.useState('one');
	const stateData = useSelector((state) => state.data);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchServerData());
	}, [dispatch]);

	return (
		<section className={ingredientCss.ingredients}>
			<h2 className={`${ingredientCss.title} text text_type_main-large`}>Соберите бургер</h2>
			<div className={ingredientCss.tabWrapper}>
				<Tab value="one" active={current === 'one'} onClick={setCurrent}>
					One
				</Tab>
				<Tab value="two" active={current === 'two'} onClick={setCurrent}>
					Two
				</Tab>
				<Tab value="three" active={current === 'three'} onClick={setCurrent}>
					Three
				</Tab>
			</div>
			<div className={ingredientCss.products}>
				<div className="rolls">
					<IngredientBox data={stateData.rollsArray} title="Булки" {...props} />
					<IngredientBox data={stateData.sauceArray} title="Соусы" {...props} />
					<IngredientBox data={stateData.mainArray} title="Начинки" {...props} />
				</div>
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	isModalOpen: PropTypes.bool,
	openModal: PropTypes.func,
	closeModal: PropTypes.func,
	selectedIngredient: PropTypes.object,
};

export default BurgerIngredients;
