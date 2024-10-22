import IngredientCss from './Ingredient.module.css';

const Ingredient = (props) => {
	const imageSrc = props.image;
	const name = props.name;

	return (
		<div className={IngredientCss.ingredient}>
			<div className="imgBox">
				<img src={imageSrc} alt={name} />
			</div>
		</div>
	);
};

export default Ingredient;
