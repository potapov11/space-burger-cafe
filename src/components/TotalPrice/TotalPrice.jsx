import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { calculateTotalPrice } from '../../utils/utils';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPriceCss from './TotalPrice.module.css';

const TotalPrice = ({ openModal }) => {
	const navigate = useNavigate();
	const dataConstructor = useSelector((store) => store.constructorReducer.constructorElems);
	const isAuthChecked = useSelector((store) => store.loginReducer.isAuthChecked);
	const user = useSelector((store) => store.loginReducer.name);

	const { bunItems } = dataConstructor;
	const { ingredients } = dataConstructor;

	console.log(dataConstructor, '...TotalPrice dataConstructor...');

	console.log(bunItems, ingredients, '...TotalPrice ingredients...');

	const allIngredients = [...bunItems, ...ingredients];
	const allPrice = calculateTotalPrice(allIngredients);

	console.log(allPrice, 'allprice');

	const handleOrderBtn = () => {
		if (isAuthChecked && user) {
			openModal();
		} else {
			navigate('/login');
		}
	};

	// console.log(isAuthChecked, '...isAuthChecked Protected...');
	// console.log(user, '...user Protected...');

	// alert(user, 'user', isAuthChecked, 'isAuthChecked');

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

TotalPrice.propTypes = {
	openModal: PropTypes.func,
};

export default TotalPrice;
