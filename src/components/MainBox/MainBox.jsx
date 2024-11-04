import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addModalIngredient, clearModalIngredient } from '../../services/actions/modal-ingredient-action';
import MainBoxCss from './MainBox.module.css';
import Modal from '../Modal/Modal';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetail from '../OrderDetails/OrderDetail';

const MainBox = () => {
	const [isModalOpen, setModalOpen] = React.useState(false);
	const [isModalOrderOpen, setModalOrderOpen] = React.useState(false);
	const dispatch = useDispatch();
	const ingredientModal = useSelector((store) => store.modalIngredientReducer.ingredientsModal);
	const targetIngredient = ingredientModal[0];
	console.log(ingredientModal, '...ingredientModal...');

	// const [selectedIngredient, setSelectedIngredient] = React.useState(null);

	const openOrderModal = () => {
		setModalOrderOpen(true);
	};

	const openModal = (detail) => {
		document.body.classList.add('overlay-modal');
		dispatch(addModalIngredient(detail));
		// setSelectedIngredient(detail);
		setModalOpen(true);
	};

	const closeModal = () => {
		document.body.classList.remove('overlay-modal');

		dispatch(clearModalIngredient());
		setModalOrderOpen(false);
		setModalOpen(false);
	};

	return (
		<main className={MainBoxCss.main}>
			<div className={`${MainBoxCss.container} container`}>
				{/* <BurgerIngredients isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} selectedIngredient={selectedIngredient} /> */}
				<BurgerIngredients isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
				<BurgerConstructor openModal={openOrderModal} />
			</div>
			{ingredientModal && (
				<Modal isModalOpen={isModalOpen} onClose={closeModal} setModalOrderOpen={setModalOrderOpen} setModalOpen={setModalOpen}>
					<p className="text text_type_main-medium">Детали ингредиента</p>
					<IngredientDetails selectedIngredient={targetIngredient} />
				</Modal>
			)}

			<Modal isModalOpen={isModalOrderOpen} onClose={closeModal}>
				<OrderDetail />
			</Modal>
		</main>
	);
};

export default MainBox;
