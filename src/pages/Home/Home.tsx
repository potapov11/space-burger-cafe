import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createOrder } from '../../services/actions/data-action.js';
import { addOrderDetail, orderFailure, orderSuccess } from '../../services/actions/order-modal-action.js';
import { addIngredient, clearConstructor } from '../../services/actions/constructor-action.js';
import HomeCss from './Home.module.css';
import Modal from '../../components/Modal/Modal.jsx';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients.tsx';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor.tsx';
import OrderDetail from '../../components/OrderDetails/OrderDetail.jsx';

interface HomePageProps {
	onClose: () => void;
	isModalOrderOpen: boolean;
	setModalOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage: React.FC<HomePageProps> = ({ onClose, isModalOrderOpen, setModalOrderOpen }): React.JSX.Element => {
	const [orderDataNumber, setOrderData] = React.useState(null);
	const dispatch = useDispatch();
	//@ts-ignore
	const dataConstructor = useSelector((store) => store.constructorReducer.constructorElems);

	const openOrderModal = async () => {
		const ingredientIds = [...dataConstructor.bunItems.map((item) => item._id), ...dataConstructor.ingredients.map((item) => item._id), ...dataConstructor.bunItems.map((item) => item._id)];
		setModalOrderOpen(true);

		try {
			dispatch(addOrderDetail());
			//@ts-ignore
			const orderData = await dispatch(createOrder(ingredientIds));

			if (orderData && orderData.order) {
				//@ts-ignore
				const orderDataNum = orderData.order.number;
				setOrderData(orderDataNum);
				//@ts-ignore
				dispatch(orderSuccess(orderData));
				dispatch(clearConstructor());
			} else {
				throw new Error('Не удалось получить данные заказа');
			}
		} catch (error) {
			console.error('Ошибка при создании заказа:', error);
			//@ts-ignore
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
