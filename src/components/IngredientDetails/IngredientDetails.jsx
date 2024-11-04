import PropTypes from 'prop-types';

const IngredientDetails = (props) => {
	const { selectedIngredient } = props;

	console.log(selectedIngredient, '...selectedIngredient...');

	return (
		<div className="modal-info">
			<div className="modal-image-box">
				<img src={selectedIngredient.item.image_large} alt={selectedIngredient.item.name} />
			</div>
			<p className="text text_type_main-medium modal-name">{selectedIngredient.item.name}</p>
			<div className="modal-energy-info">
				<div className="modal-energy-inner">
					<p className="modal-energy-text text text_type_main-default text_color_inactive">Калории,ккал</p>
					<p className="modal-energy-subtext text text_type_digits-default text_color_inactive mt-2">{selectedIngredient.item.calories}</p>
				</div>
				<div className="modal-energy-inner">
					<p className="modal-energy-text text text_type_main-default text_color_inactive">Белки, г</p>
					<p className="modal-energy-subtext text text_type_digits-default text_color_inactive mt-2">{selectedIngredient.item.proteins}</p>
				</div>
				<div className="modal-energy-inner">
					<p className="modal-energy-text text text_type_main-default text_color_inactive">Жиры, г</p>
					<p className="modal-energy-subtext text text_type_digits-default text_color_inactive mt-2">{selectedIngredient.item.fat}</p>
				</div>
				<div className="modal-energy-inner">
					<p className="modal-energy-text text text_type_main-default text_color_inactive">Углеводы, г</p>
					<p className="modal-energy-subtext text text_type_digits-default text_color_inactive mt-2">{selectedIngredient.item.carbohydrates}</p>
				</div>
			</div>
		</div>
	);
};

IngredientDetails.propTypes = {
	selectedIngredient: PropTypes.object,
};

export default IngredientDetails;
