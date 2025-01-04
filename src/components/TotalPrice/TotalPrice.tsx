import React from 'react';
import TotalPriceCss from './TotalPrice.module.css';
import { useSelector } from '../../main';
import { useNavigate } from 'react-router-dom';
import { calculateTotalPrice } from '../../utils/utils.ts';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const TotalPrice = ({ openModal }: { openModal: () => void }) => {
	const navigate = useNavigate();

	const dataConstructor = useSelector((store) => store.constructorReducer.constructorElems);
	const isAuthChecked = useSelector((store) => store.loginReducer.isAuthChecked);
	const user = useSelector((store) => store.loginReducer.name);

	const { bunItems } = dataConstructor;
	const { ingredients } = dataConstructor;

	console.log(ingredients, '...ingredients..TotalPrice...');

	const allIngredients = [...bunItems, ...ingredients];

	const allPrice = calculateTotalPrice(allIngredients);

	const handleOrderBtn = () => {
		if (isAuthChecked && user) {
			openModal();
		} else {
			navigate('/login');
		}
	};

	return (
		<div className={TotalPriceCss.wrapper}>
			<div className={TotalPriceCss.totalInner}>
				<div className={TotalPriceCss.priceBox}>
					<p className="text text_type_digits-medium">{allPrice}</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button disabled={bunItems.length === 0 ? true : false} htmlType="button" type="primary" size="medium" onClick={handleOrderBtn}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};

export default TotalPrice;
