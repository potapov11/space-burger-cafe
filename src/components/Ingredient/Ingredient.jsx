import PropTypes from 'prop-types';
import IngredientCss from './Ingredient.module.css';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = (props) => {
	const { dataStore, image, name, price, openModal, item } = props;

	function count(store, item) {
		let count = 0;

		if (store?.length > 0) {
			store.forEach((itemStore) => {
				if (itemStore._id === item._id) {
					count++;
				}
			});
		}
		return count;
	}

	const quantityNum = count(dataStore, item);

	const [, dragRef] = useDrag({
		type: 'ingr',
		item: { item },
		collect: (monitor) => {
			return {
				isDrag: monitor.isDragging(),
			};
		},
	});

	return (
		<>
			<li
				className={IngredientCss.ingredient}
				ref={dragRef}
				onClick={() => {
					openModal(props);
				}}>
				{quantityNum > 0 && <Counter count={quantityNum} size="default" extraClass="m-1" />}
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
	item: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		proteins: PropTypes.number,
		fat: PropTypes.number,
		carbohydrates: PropTypes.number,
		calories: PropTypes.number,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
		image_mobile: PropTypes.string,
		image_large: PropTypes.string,
		__v: PropTypes.number,
	}).isRequired,
};

export default Ingredient;
