import React from 'react';
import HomeCss from './Home.module.css';
import { useSelector } from '../../main';
import { useDispatch } from '../../hooks/useDispatch';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createOrder } from '../../services/actions/data-action.js';
import { addOrderDetail, orderFailure, orderSuccess } from '../../services/actions/order-modal-action.js';
import { addIngredient, clearConstructor } from '../../services/actions/constructor-action.js';
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
				dispatch(orderSuccess());
				dispatch(clearConstructor());
			} else {
				throw new Error('Не удалось получить данные заказа');
			}
		} catch (error) {
			// console.error('Ошибка при создании заказа:', error);
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
