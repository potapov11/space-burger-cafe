import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { addModalIngredient, clearModalIngredient } from '../../services/actions/modal-ingredient-action';
import { createOrder } from '../../services/actions/data-action';
import { addOrderDetail, orderFailure, orderSuccess } from '../../services/actions/order-modal-action';
import { addIngredient, clearConstructor } from '../../services/actions/constructor-action';
import HomeCss from './Home.module.css';
import Modal from '../../components/Modal/Modal';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import OrderDetail from '../../components/OrderDetails/OrderDetail';

const HomePage = () => {
	const [isModalOpen, setModalOpen] = React.useState(false);
	const [isModalOrderOpen, setModalOrderOpen] = React.useState(false);
	const [orderDataNumber, setOrderData] = React.useState(null);
	const dispatch = useDispatch();
	const storeBun = useSelector((store) => store.constructorReducer.constructorElems.bunItems);
	const storeIngredients = useSelector((store) => store.constructorReducer.constructorElems.ingredients);
	const ingredientModal = useSelector((store) => store.modalIngredientReducer.ingredientsModal);
	const [targetIngredient] = ingredientModal;

	const openOrderModal = async () => {
		storeIngredients.unshift(storeBun[0]);
		storeIngredients.push(storeBun[0]);
		const ingredientIds = storeIngredients.map((ingredient) => ingredient._id);
		try {
			dispatch(addOrderDetail()); // Начинаем загрузку
			const orderData = await dispatch(createOrder(ingredientIds)); // Создаем заказ

			if (orderData && orderData.order) {
				const orderDataNum = orderData.order.number;
				setOrderData(orderDataNum);
				setModalOrderOpen(true);
				dispatch(orderSuccess(orderData)); // Передаем данные заказа
				dispatch(clearConstructor());
			} else {
				throw new Error('Не удалось получить данные заказа');
			}
		} catch (error) {
			console.error('Ошибка при создании заказа:', error);
			dispatch(orderFailure(error.message)); // Обработка ошибки
		}
	};

	const openModal = (detail) => {
		document.body.classList.add(HomeCss.overlayModal);
		dispatch(addModalIngredient(detail));
		setModalOpen(true);
	};

	const handleDrop = (item) => {
		dispatch(addIngredient(item.item));
	};

	const closeModal = () => {
		document.body.classList.remove(HomeCss.overlayModal);

		dispatch(clearModalIngredient());
		setModalOrderOpen(false);
		setModalOpen(false);
	};

	return (
		<main className={HomeCss.main}>
			<DndProvider backend={HTML5Backend}>
				<div className={HomeCss.container}>
					<BurgerIngredients isModalOpen={isModalOpen} openModal={openModal} />
					<BurgerConstructor openModal={openOrderModal} handleDrop={handleDrop} />
				</div>
			</DndProvider>

			{ingredientModal && (
				<Modal isModalOpen={isModalOpen} onClose={closeModal}>
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

export default HomePage;
