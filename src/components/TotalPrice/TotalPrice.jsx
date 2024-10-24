import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { mt40 } from '../../utils/vars';
import TotalPriceCss from './TotalPrice.module.css';

const TotalPrice = () => {
	return (
		<div className="total" style={mt40}>
			<div className={TotalPriceCss.totalInner}>
				<div className={TotalPriceCss.priceBox}>
					<p className="text text_type_digits-medium">610</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button htmlType="button" type="primary" size="medium">
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};

export default TotalPrice;
