import PropTypes from 'prop-types';
import IngredientDetailStyle from './IngredientDetails.module.css';

const IngredientDetails = (props) => {
	const { selectedIngredient } = props;

	return (
		<div className="modal-info">
			<div className={IngredientDetailStyle.modalImageBox}>
				<img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
			</div>
			<p className={`text text_type_main-medium ${IngredientDetailStyle.modalName}`}>{selectedIngredient.name}</p>
			<div className={IngredientDetailStyle.modalEnergyInfo}>
				<div>
					<p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
					<p className={`${IngredientDetailStyle.modalEnergySubtext} text text_type_digits-default text_color_inactive mt-2`}>{selectedIngredient.calories}</p>
				</div>
				<div>
					<p className="text text_type_main-default text_color_inactive">Белки, г</p>
					<p className={`${IngredientDetailStyle.modalEnergySubtext} text text_type_digits-default text_color_inactive mt-2`}>{selectedIngredient.proteins}</p>
				</div>
				<div>
					<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
					<p className={`${IngredientDetailStyle.modalEnergySubtext} text text_type_digits-default text_color_inactive mt-2`}>{selectedIngredient.fat}</p>
				</div>
				<div>
					<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
					<p className={`${IngredientDetailStyle.modalEnergySubtext} text text_type_digits-default text_color_inactive mt-2`}>{selectedIngredient.carbohydrates}</p>
				</div>
			</div>
		</div>
	);
};

IngredientDetails.propTypes = {
	selectedIngredient: PropTypes.object,
};

export default IngredientDetails;
