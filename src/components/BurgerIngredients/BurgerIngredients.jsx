import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServerData } from '../../services/actions/data-action';
import { useInView } from 'react-intersection-observer';
import ingredientCss from './BurgerIngredients.module.css';
import IngredientBox from '../IngredientBox/IngredientBox';

const BurgerIngredients = (props) => {
	const [current, setCurrent] = React.useState('one');
	const stateData = useSelector((state) => state.data);
	const ingredientsData = useSelector((state) => state.constructorReducer.constructorElems);

	const dispatch = useDispatch();

	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

	const setTabs = (value) => {
		setCurrent(value);

		if (value === 'one') {
			bunRef.current.scrollIntoView({ behavior: 'smooth' });
		} else if (value === 'two') {
			sauceRef.current.scrollIntoView({ behavior: 'smooth' });
		} else if (value === 'three') {
			mainRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		dispatch(fetchServerData());
	}, [dispatch]);

	const { ref: bunRefView, inView: bunInView } = useInView({ threshold: 0.5 });
	const { ref: sauceRefView, inView: sauceInView } = useInView({ threshold: 0.5 });
	const { ref: mainRefView, inView: mainInView } = useInView({ threshold: 0.5 });

	useEffect(() => {
		if (bunInView) setCurrent('one');
		else if (sauceInView) setCurrent('two');
		else if (mainInView) setCurrent('three');
	}, [bunInView, sauceInView, mainInView]);

	return (
		<section className={ingredientCss.ingredients}>
			<h2 className={`${ingredientCss.title} text text_type_main-large`}>Соберите бургер</h2>
			<div className={ingredientCss.tabWrapper}>
				<Tab value="one" active={current === 'one'} onClick={() => setTabs('one')}>
					Булки
				</Tab>
				<Tab value="two" active={current === 'two'} onClick={() => setTabs('two')}>
					Соусы
				</Tab>
				<Tab value="three" active={current === 'three'} onClick={() => setTabs('three')}>
					Начинки
				</Tab>
			</div>
			<div className={ingredientCss.products}>
				<div>
					<div ref={bunRefView}>
						<IngredientBox dataStore={ingredientsData.bunItems} ref={bunRef} data={stateData.rollsArray} title="Булки" {...props} />
					</div>
					<div ref={sauceRefView}>
						<IngredientBox dataStore={ingredientsData.ingredients} ref={sauceRef} data={stateData.sauceArray} title="Соусы" {...props} />
					</div>
					<div ref={mainRefView}>
						<IngredientBox dataStore={ingredientsData.ingredients} ref={mainRef} data={stateData.mainArray} title="Начинки" {...props} />
					</div>
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
