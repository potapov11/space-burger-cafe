import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { calculateTotalPrice } from '../../utils/utils';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPriceCss from './TotalPrice.module.css';

const TotalPrice = ({ openModal }: { openModal: () => void }) => {
	const navigate = useNavigate();

	//@ts-ignore
	const dataConstructor = useSelector((store) => store.constructorReducer.constructorElems);
	//@ts-ignore
	const isAuthChecked = useSelector((store) => store.loginReducer.isAuthChecked);
	//@ts-ignore
	const user = useSelector((store) => store.loginReducer.name);

	const { bunItems } = dataConstructor;
	const { ingredients } = dataConstructor;

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
