import Modal from '../Modal/Modal';
import IngredientBoxCss from './Ingredient.module.css';
import Ingredient from '../Ingredient/Ingredient';

const IngredientBox = ({ margin, marginTop, data, title, isModalOpen, openModal, closeModal }) => {
	return (
		<div className="ingredientBox" style={(margin, marginTop)}>
			<h3 className="text text_type_main-medium" style={{ marginBottom: '25px' }}>
				{title}
			</h3>
			<ul className={IngredientBoxCss.productsBox}>
				{data.map((item, i) => {
					return <Ingredient key={item.id} {...item} isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />;
				})}
			</ul>
		</div>
	);
};

export default IngredientBox;
