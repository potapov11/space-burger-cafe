import PropTypes from 'prop-types';
import IngredientCss from './Ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = (props) => {
	const { image, name, price, openModal } = props;

	return (
		<>
			<li className={IngredientCss.ingredient} onClick={() => openModal(props)}>
				<Counter count={1} size="default" extraClass="m-1" />
				<div className="imgBox">
					<img src={image} alt={name} />
				</div>
				<div className={IngredientCss.textBox}>
					<p>
						<span className="text text_type_digits-default mb-1">{price}</span>
						<CurrencyIcon type="primary" />
					</p>
				</div>
				<p className={`text text_type_main-default ${IngredientCss.bottomText}`}>{name}</p>
			</li>
		</>
	);
};

Ingredient.propTypes = {
	image: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.number,
	openModal: PropTypes.func,
};

export default Ingredient;
