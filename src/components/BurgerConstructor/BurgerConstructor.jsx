import React from 'react';
import PropTypes from 'prop-types';
import TotalPrice from '../TotalPrice/TotalPrice';
import { serverURL } from '../../utils/vars';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCss from './BurgerConstructor.module.css';
import bun from '../../images/ingredientImgs/bun.png';

const BurgerMainIngredients = ({ openModal }) => {
	const [dataServer, setDataServer] = React.useState([]);
	const [mainArray, setMainArray] = React.useState([]);

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
				<div className={BurgerConstructorCss.productsWrapper}>
					<ConstructorElement extraClass={BurgerConstructorCss.mr10} type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={bun} />
					<ul className={`${BurgerConstructorCss.constructorList} mt-4`}>
						{mainArray.map((item) => {
							return (
								<li className={`${BurgerConstructorCss.constructorListItem} mb-4`} key={item.id}>
									<DragIcon type="primary" />
									<ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
								</li>
							);
						})}
					</ul>
					<ConstructorElement extraClass={BurgerConstructorCss.mr10} type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={bun} />
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
