import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createOrder } from '../../services/actions/data-action';
import { addOrderDetail, orderFailure, orderSuccess } from '../../services/actions/order-modal-action';
import { addIngredient, clearConstructor } from '../../services/actions/constructor-action';
import HomeCss from './Home.module.css';
import Modal from '../../components/Modal/Modal';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor.tsx';
import OrderDetail from '../../components/OrderDetails/OrderDetail';

const HomePage = ({ onClose, isModalOrderOpen, setModalOrderOpen }) => {
	// console.log(isModalOpen, '...isModalOpen..');

	const [orderDataNumber, setOrderData] = React.useState(null);
	const dispatch = useDispatch();
	const dataConstructor = useSelector((store) => store.constructorReducer.constructorElems);

	const openOrderModal = async () => {
		const ingredientIds = [...dataConstructor.bunItems.map((item) => item._id), ...dataConstructor.ingredients.map((item) => item._id), ...dataConstructor.bunItems.map((item) => item._id)];
		setModalOrderOpen(true);

		try {
			dispatch(addOrderDetail());
			const orderData = await dispatch(createOrder(ingredientIds));

			if (orderData && orderData.order) {
				const orderDataNum = orderData.order.number;
				setOrderData(orderDataNum);
				dispatch(orderSuccess(orderData));
				dispatch(clearConstructor());
			} else {
				throw new Error('Не удалось получить данные заказа');
			}
		} catch (error) {
			console.error('Ошибка при создании заказа:', error);
			dispatch(orderFailure(error.message));
		}
	};

	const handleDrop = (item) => {
		dispatch(addIngredient(item.item));
	};

	return (
		<main className={HomeCss.main}>
			<DndProvider backend={HTML5Backend}>
				<div className={HomeCss.container}>
					{/* <BurgerIngredients isModalOpen={isModalOpen} openModal={openModal} /> */}
					<BurgerIngredients />
					<BurgerConstructor openModal={openOrderModal} handleDrop={handleDrop} />
				</div>
			</DndProvider>

			<Modal isModalOpen={isModalOrderOpen} onClose={onClose}>
				{orderDataNumber !== null && <OrderDetail orderDataNumber={orderDataNumber} />}
			</Modal>
		</main>
	);
};

export default HomePage;
