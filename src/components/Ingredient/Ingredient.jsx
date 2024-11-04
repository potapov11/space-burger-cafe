import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import addIngredient from '../../services/actions/constructor-action';
import IngredientCss from './Ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = (props) => {
	const { image, name, price, openModal, item } = props;

	const dispatch = useDispatch();

	const addIngredientToConstructor = (item) => {
		dispatch(addIngredient(item));
	};

	return (
		<>
			<li
				className={IngredientCss.ingredient}
				onClick={() => {
					openModal(props);
					addIngredientToConstructor(item);
				}}>
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
