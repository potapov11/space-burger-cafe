import React from 'react';
import PropTypes from 'prop-types';
import { serverURL } from '../../utils/vars';
import ingredientCss from './BurgerIngredients.module.css';
import IngredientBox from '../IngredientBox/IngredientBox';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = (props) => {
	const [current, setCurrent] = React.useState('one');
	const [rollsArray, setRollsArray] = React.useState(null);
	const [sauceArray, setSauceArray] = React.useState(null);
	const [mainArray, setMainArray] = React.useState(null);

	React.useEffect(() => {
		const fetchServerData = async () => {
			try {
				const serverData = await fetch(serverURL);

				if (!serverData.ok) {
					throw new Error(`Ошибка сетевого ответа ${serverData.status}`);
				}

				const res = await serverData.json();

				if (res) {
					const rollsArray = res.data.filter((item) => item.type === 'bun');
					const sauceArray = res.data.filter((item) => item.type === 'sauce');
					const mainArray = res.data.filter((item) => item.type === 'main');

					setRollsArray(rollsArray);
					setSauceArray(sauceArray);
					setMainArray(mainArray);
				}
			} catch (error) {
				console.error(`Произошла ошибка ${error}`);
			}
		};

		fetchServerData();
	}, []);

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
					<IngredientBox data={rollsArray} title="Булки" {...props} />
					<IngredientBox data={sauceArray} title="Соусы" {...props} />
					<IngredientBox data={mainArray} title="Начинки" {...props} />
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
