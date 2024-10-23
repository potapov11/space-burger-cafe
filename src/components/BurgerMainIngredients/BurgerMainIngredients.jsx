import React from 'react';
import { serverURL } from '../../utils/vars';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCss from './BurgerMainIngredients.module.css';

import data from '../../utils/data';

const BurgerMainIngredients = () => {
	const [current, setCurrent] = React.useState('one');
	const [dataServer, setDataServer] = React.useState([]);
	const [mainArray, setMainArray] = React.useState([]);

	// const mb40 = {
	// 	marginBottom: '40px',
	// };

	React.useEffect(() => {
		const fetchServerData = async () => {
			try {
				const serverData = await fetch(serverURL);
				const res = await serverData.json();

				if (res) {
					setDataServer(res.data);
					const mainArray = res.data.filter((item) => item.type === 'main');
					setMainArray(mainArray);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchServerData();
	}, []);

	return (
		<section>
			<div className="products">
				<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={img} />
					<ConstructorElement text="Краторная булка N-200i (верх)" price={50} thumbnail={img} />
					<ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={img} />
				</div>
			</div>
		</section>
	);
};

export default BurgerMainIngredients;
