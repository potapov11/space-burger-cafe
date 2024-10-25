import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPriceCss from './TotalPrice.module.css';

const TotalPrice = ({ openModal }) => {
	return (
		<div className="mt-40">
			<div className={TotalPriceCss.totalInner}>
				<div className={TotalPriceCss.priceBox}>
					<p className="text text_type_digits-medium">610</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button htmlType="button" type="primary" size="medium" onClick={openModal}>
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
