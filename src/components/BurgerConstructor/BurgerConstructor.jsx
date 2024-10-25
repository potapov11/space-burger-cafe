import React from 'react';
import TotalPrice from '../TotalPrice/TotalPrice';
import { serverURL } from '../../utils/vars';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCss from './BurgerConstructor.module.css';
import bun from '../../images/ingredientImgs/bun.png';

const BurgerMainIngredients = () => {
	const [dataServer, setDataServer] = React.useState([]);
	const [mainArray, setMainArray] = React.useState([]);

	const mb16 = {
		marginBottom: '16px',
	};

	const mt16 = {
		marginTop: '16px',
	};

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
				<div style={{ display: 'flex', flexDirection: 'column', marginTop: '80px', alignItems: 'end' }}>
					<ConstructorElement extraClass={BurgerConstructorCss.mr10} type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={bun} />
					<ul className={BurgerConstructorCss.constructorList} style={mt16}>
						{mainArray.map((item) => {
							return (
								<li className={BurgerConstructorCss.constructorListItem} key={item.id} style={mb16}>
									<DragIcon type="primary" />
									<ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
								</li>
							);
						})}
					</ul>
					<ConstructorElement extraClass={BurgerConstructorCss.mr10} type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={bun} />
				</div>
			</div>
			<TotalPrice />
		</section>
	);
};

export default BurgerMainIngredients;
