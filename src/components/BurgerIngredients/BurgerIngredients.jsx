import React from 'react';
import { serverURL, mb40, mt40 } from '../../utils/vars';
import ingredientCss from './BurgerIngredients.module.css';
import IngredientBox from '../IngredientBox/IngredientBox';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = (props) => {
	const [current, setCurrent] = React.useState('one');
	const [dataServer, setDataServer] = React.useState([]);
	const [rollsArray, setRollsArray] = React.useState([]);
	const [sauceArray, setSauceArray] = React.useState([]);
	const [mainArray, setMainArray] = React.useState([]);

	React.useEffect(() => {
		const fetchServerData = async () => {
			try {
				const serverData = await fetch(serverURL);
				const res = await serverData.json();

				if (res) {
					setDataServer(res.data);

					const rollsArray = res.data.filter((item) => item.type === 'bun');
					const sauceArray = res.data.filter((item) => item.type === 'sauce');
					const mainArray = res.data.filter((item) => item.type === 'main');

					setRollsArray(rollsArray);
					setSauceArray(sauceArray);
					setMainArray(mainArray);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchServerData();
	}, []);

	return (
		<section className={ingredientCss.ingredients}>
			<h2 className={`${ingredientCss.title} text text_type_main-large`}>Соберите бургер</h2>
			<div style={{ display: 'flex', mb40 }}>
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
					<IngredientBox margin={mb40} marginTop={mt40} data={rollsArray} title="Булки" {...props} />
					<IngredientBox marginTop={mt40} data={sauceArray} title="Соусы" {...props} />
					<IngredientBox marginTop={mt40} data={mainArray} title="Начинки" {...props} />
				</div>
			</div>
		</section>
	);
};

export default BurgerIngredients;
