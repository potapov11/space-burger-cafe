import PropTypes from 'prop-types';
import IngredientBoxCss from './IngredientBoxCss.module.css';
import Ingredient from '../Ingredient/Ingredient';

const IngredientBox = ({ data, title, isModalOpen, openModal, closeModal }) => {
	console.log(data, '...IngredientBox...');

	return (
		<div className={IngredientBoxCss.ingredientBox}>
			<h3 className="text text_type_main-medium mb-6">{title}</h3>
			<ul className={IngredientBoxCss.productsBox}>
				{data &&
					data.length > 0 &&
					data.map((item) => {
						return <Ingredient key={item.id} {...item} isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />;
					})}
			</ul>
		</div>
	);
};

IngredientBox.propTypes = {
	data: PropTypes.array,
	title: PropTypes.string,
	isModalOpen: PropTypes.bool,
	openModal: PropTypes.func,
	closeModal: PropTypes.func,
};

export default IngredientBox;
