import React from 'react';
import PropTypes from 'prop-types';
import TotalPrice from '../TotalPrice/TotalPrice';
import { serverURL } from '../../utils/vars';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCss from './BurgerConstructor.module.css';
import bun from '../../images/ingredientImgs/bun.png';

const BurgerMainIngredients = ({ openModal }) => {
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
					const mainArray = res.data.filter((item) => item.type === 'main');
					setMainArray(mainArray);
				}
			} catch (error) {
				console.error(`Произошла ошибка ${error}`);
			}
		};

		fetchServerData();
	}, []);

	return (
		<section>
			<div className="products">
				<div className={BurgerConstructorCss.productsWrapper}>
					<ConstructorElement extraClass={`${BurgerConstructorCss.mr14} mb-4`} type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={bun} />
					<ul className={`${BurgerConstructorCss.constructorList} mt-4`}>
						{mainArray &&
							mainArray.length > 0 &&
							mainArray.map((item) => {
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
