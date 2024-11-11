import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { calculateTotalPrice } from '../../utils/utils';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPriceCss from './TotalPrice.module.css';

const TotalPrice = ({ openModal }) => {
	const dataConstructor = useSelector((store) => store.constructorReducer.constructorElems);
	const { bunItems } = dataConstructor;
	const { ingredients } = dataConstructor;

	const allIngredients = [...bunItems, ...ingredients];

	const allPrice = calculateTotalPrice(allIngredients);

	return (
		<div className={TotalPriceCss.wrapper}>
			<div className={TotalPriceCss.totalInner}>
				<div className={TotalPriceCss.priceBox}>
					<p className="text text_type_digits-medium">{allPrice}</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button disabled={bunItems.length === 0 ? true : false} htmlType="button" type="primary" size="medium" onClick={openModal}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};

TotalPrice.propTypes = {
	openModal: PropTypes.func,
};

export default TotalPrice;
