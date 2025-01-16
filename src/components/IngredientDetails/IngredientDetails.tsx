import React from 'react';
import IngredientDetailStyle from './IngredientDetails.module.css';
import { useSelector } from '../../main';
import { useParams } from 'react-router-dom';

const IngredientDetails = ({ styleCenter }: { styleCenter?: boolean }): React.JSX.Element => {
	const { id } = useParams();

	const ingredientsData = useSelector((store) => store.data);
	const { mainArray, rollsArray, sauceArray } = ingredientsData;
	const allsData = [...mainArray, ...sauceArray, ...rollsArray];

	const selectedIngredient = allsData.find((ingredient) => ingredient._id === id);

	if (!selectedIngredient) {
		return <p>Ингредиент не был найден.</p>;
	}

	return (
		<div className={styleCenter ? `${IngredientDetailStyle.modalInfo} ${IngredientDetailStyle.centerWindow}` : `${IngredientDetailStyle.modalInfo}`}>
			<p className="text text_type_main-large">Детали ингредиента</p>
			<div className={IngredientDetailStyle.modalImageBox}>
				<img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
			</div>
			<p className={`text text_type_main-medium ${IngredientDetailStyle.modalName}`}>{selectedIngredient.name}</p>
			<div className={IngredientDetailStyle.modalEnergyInfo}>
				<div>
					<p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
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

export default IngredientDetails;
