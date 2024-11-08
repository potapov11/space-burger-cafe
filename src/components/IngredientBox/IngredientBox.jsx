import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { IngredientType } from '../../utils/types';
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
	data: PropTypes.arrayOf(IngredientType),
	title: PropTypes.string,
	isModalOpen: PropTypes.bool,
	openModal: PropTypes.func,
	closeModal: PropTypes.func,
};

export default IngredientBox;
