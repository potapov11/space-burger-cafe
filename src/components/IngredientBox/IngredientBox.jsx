import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import IngredientBoxCss from './IngredientBoxCss.module.css';
import Ingredient from '../Ingredient/Ingredient';

const IngredientBox = forwardRef(({ dataStore, data, title, isModalOpen, openModal, closeModal }, ref) => {
	return (
		<div ref={ref} className={IngredientBoxCss.ingredientBox}>
			<h3 className="text text_type_main-medium mb-6">{title}</h3>
			<ul className={IngredientBoxCss.productsBox}>
				{data?.length > 0 && data.map((item) => <Ingredient dataStore={dataStore} key={item._id} item={item} {...item} isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />)}
			</ul>
		</div>
	);
});

IngredientBox.displayName = 'IngredientBox';

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
