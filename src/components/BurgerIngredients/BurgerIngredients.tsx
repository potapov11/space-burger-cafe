import React, { useEffect, useRef, useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import ingredientCss from './BurgerIngredients.module.css';
import IngredientBox from '../IngredientBox/IngredientBox';

const BurgerIngredients = (): React.JSX.Element => {
	const [current, setCurrent] = useState<string>('one');
	//@ts-ignore
	const stateData = useSelector((state) => state.data);
	//@ts-ignore
	const ingredientsData = useSelector((state) => state.constructorReducer.constructorElems);

	const bunRef = useRef<HTMLDivElement | null>(null);
	const sauceRef = useRef<HTMLDivElement | null>(null);
	const mainRef = useRef<HTMLDivElement | null>(null);

	const setTabs = (value) => {
		setCurrent(value);

		if (value === 'one') {
			bunRef.current?.scrollIntoView({ behavior: 'smooth' });
		} else if (value === 'two') {
			sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
		} else if (value === 'three') {
			mainRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	};

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
						{/* @ts-ignore */}
						<IngredientBox dataStore={ingredientsData.bunItems} ref={bunRef} data={stateData.rollsArray} title="Булки" />
					</div>
					<div ref={sauceRefView}>
						{/* @ts-ignore */}
						<IngredientBox dataStore={ingredientsData.ingredients} ref={sauceRef} data={stateData.sauceArray} title="Соусы" />
					</div>
					<div ref={mainRefView}>
						{/* @ts-ignore */}
						<IngredientBox dataStore={ingredientsData.ingredients} ref={mainRef} data={stateData.mainArray} title="Начинки" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default BurgerIngredients;
