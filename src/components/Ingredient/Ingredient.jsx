import IngredientCss from './Ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = (props) => {
	const imageSrc = props.image;
	const name = props.name;
	const price = props.price;

	return (
		<li className={IngredientCss.ingredient}>
			<Counter count={1} size="default" extraClass="m-1" />
			<div className="imgBox">
				<img src={imageSrc} alt={name} />
			</div>
			<div className={IngredientCss.textBox}>
				<p>
					<span className="text text_type_digits-default">{price}</span>
					<CurrencyIcon type="primary" />
				</p>
			</div>
			<p className="text text_type_main-default">{name}</p>
		</li>
	);
};

export default Ingredient;
