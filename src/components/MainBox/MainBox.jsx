import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { addModalIngredient, clearModalIngredient } from '../../services/actions/modal-ingredient-action';
import addIngredient from '../../services/actions/constructor-action';
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
	const dataConstructor = useSelector((store) => store.constructorReducer.ingredients);
	const ingredientModal = useSelector((store) => store.modalIngredientReducer.ingredientsModal);
	const [targetIngredient] = ingredientModal;

	const openOrderModal = () => {
		setModalOrderOpen(true);
	};

	const openModal = (detail) => {
		console.log(detail, '...deat openModal');

		document.body.classList.add('overlay-modal');
		dispatch(addModalIngredient(detail));
		setModalOpen(true);
		console.log(dataConstructor, '...dataConstructor...');
	};

	const handleDrop = (item) => {
		console.log(item.item, '...dropped item');
		dispatch(addIngredient(item.item));
		console.log(dataConstructor, '...after drop dataConstructor');
	};

	const closeModal = () => {
		document.body.classList.remove('overlay-modal');

		dispatch(clearModalIngredient());
		setModalOrderOpen(false);
		setModalOpen(false);
	};

	return (
		<main className={MainBoxCss.main}>
			<DndProvider backend={HTML5Backend}>
				<div className={`${MainBoxCss.container} container`}>
					<BurgerIngredients isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
					<BurgerConstructor openModal={openOrderModal} handleDrop={handleDrop} />
				</div>
			</DndProvider>

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
