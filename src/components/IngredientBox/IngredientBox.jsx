import PropTypes from 'prop-types';
import IngredientBoxCss from './IngredientBoxCss.module.css';
import Ingredient from '../Ingredient/Ingredient';

const IngredientBox = ({ data, title, isModalOpen, openModal, closeModal }) => {
	// const dispatch = useDispatch();

	// const addIngredientToConstructor = (item) => {
	// 	dispatch(addIngredient(item));
	// };

	return (
		<div className={IngredientBoxCss.ingredientBox}>
			<h3 className="text text_type_main-medium mb-6">{title}</h3>
			<ul className={IngredientBoxCss.productsBox}>
				{data?.length > 0 &&
					data.map((item) => {
						return <Ingredient key={item._id} item={item} {...item} isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />;
					})}
			</ul>
		</div>
	);
};

IngredientBox.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
			type: PropTypes.string,
			proteins: PropTypes.number,
			fat: PropTypes.number,
			carbohydrates: PropTypes.number,
			calories: PropTypes.number,
			price: PropTypes.number,
			image: PropTypes.string,
			image_mobile: PropTypes.string,
			image_large: PropTypes.string,
			__v: PropTypes.number,
		}),
	),
	title: PropTypes.string,
	isModalOpen: PropTypes.bool,
	openModal: PropTypes.func,
	closeModal: PropTypes.func,
};

export default IngredientBox;
