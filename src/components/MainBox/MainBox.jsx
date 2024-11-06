import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { addModalIngredient, clearModalIngredient } from '../../services/actions/modal-ingredient-action';
import { createOrder } from '../../services/actions/data-action';
import { addIngredient } from '../../services/actions/constructor-action';
import MainBoxCss from './MainBox.module.css';
import Modal from '../Modal/Modal';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetail from '../OrderDetails/OrderDetail';

const MainBox = () => {
	const [isModalOpen, setModalOpen] = React.useState(false);
	const [isModalOrderOpen, setModalOrderOpen] = React.useState(false);
	const [orderDataNumber, setOrderData] = React.useState(null);
	const dispatch = useDispatch();
	const storeBun = useSelector((store) => store.constructorReducer.constructorElems.bunItems);
	const storeIngredients = useSelector((store) => store.constructorReducer.constructorElems.ingredients);
	const ingredientModal = useSelector((store) => store.modalIngredientReducer.ingredientsModal);
	const [targetIngredient] = ingredientModal;

	const openOrderModal = async () => {
		storeIngredients.unshift(storeBun);
		storeIngredients.push(storeBun);
		const ingredientIds = storeIngredients.map((ingredient) => ingredient._id);
		const orderData = await dispatch(createOrder(ingredientIds));

		if (orderData && orderData.order) {
			const orderDataNum = orderData.order.number;
			setOrderData(orderDataNum);
			setModalOrderOpen(true);
		} else {
			console.error('Ошибка при создании заказа:', orderData);
		}
	};

	const openModal = (detail) => {
		document.body.classList.add('overlay-modal');
		dispatch(addModalIngredient(detail));
		setModalOpen(true);
	};

	const handleDrop = (item) => {
		dispatch(addIngredient(item.item));
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
				{orderDataNumber !== null && <OrderDetail orderDataNumber={orderDataNumber} />}
			</Modal>
		</main>
	);
};

export default MainBox;
