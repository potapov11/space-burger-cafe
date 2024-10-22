import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import ingredientCss from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import data from '../../utils/data';

const BurgerIngredients = () => {
	const [current, setCurrent] = React.useState('one');

	console.log(data, '...data');

	const rollsArray = data.filter((item) => item.type === 'bun');
	const sauceArray = data.filter((item) => item.type === 'sauce');
	const mainArray = data.filter((item) => item.type === 'main');

	console.log(rollsArray, '...rollsArray', sauceArray, '...sauceArray', mainArray, '...mainArray');

	return (
		<section className={ingredientCss.ingredients}>
			<h2 className={`${ingredientCss.title} text text_type_main-large`}>Соберите бургер</h2>
			<div style={{ display: 'flex', marginBottom: '40px' }}>
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
			<div className="products">
				<div className="rolls">
					<h3 className="text text_type_main-medium" style={{ marginBottom: '25px' }}>
						Булки
					</h3>
					<div className={ingredientCss.productsBox}>
						{rollsArray.map((item, i) => {
							return <Ingredient key={item.id} {...item} />;
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default BurgerIngredients;
