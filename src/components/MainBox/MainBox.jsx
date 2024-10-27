import React from 'react';
import MainBoxCss from './MainBox.module.css';
import Modal from '../Modal/Modal';
import { keyButton } from '../../utils/vars';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetail from '../OrderDetails/OrderDetail';

const MainBox = () => {
	const [isModalOpen, setModalOpen] = React.useState(false);
	const [isModalOrderOpen, setModalOrderOpen] = React.useState(false);
	const [selectedIngredient, setSelectedIngredient] = React.useState(null);

	const openOrderModal = () => {
		setModalOrderOpen(true);
	};

	const openModal = (detail) => {
		const documentWidth = parseInt(document.documentElement.clientWidth);
		const windowWidth = parseInt(window.innerWidth);
		const scrollbarWidth = windowWidth - documentWidth;

		document.body.classList.add('overlay-modal');
		document.body.style.marginRight = `${scrollbarWidth}px`;

		setSelectedIngredient(detail);
		setModalOpen(true);
	};

	const closeModal = () => {
		document.body.classList.remove('overlay-modal');
		document.body.style.marginRight = '';
		setModalOrderOpen(false);
		setModalOpen(false);
	};

	React.useEffect(() => {
		const close = (e) => {
			if (e.keyCode == keyButton) {
				setModalOrderOpen(false);
				setModalOpen(false);
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, []);

	return (
		<main className={MainBoxCss.main}>
			<div className={`${MainBoxCss.container} container`}>
				<BurgerIngredients isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} selectedIngredient={selectedIngredient} />
				<BurgerConstructor openModal={openOrderModal} />
			</div>
			{selectedIngredient && (
				<Modal isModalOpen={isModalOpen} onClose={closeModal}>
					<p className="text text_type_main-medium">Детали ингредиента</p>
					<IngredientDetails selectedIngredient={selectedIngredient} />
				</Modal>
			)}

			<Modal isModalOpen={isModalOrderOpen} onClose={closeModal}>
				<OrderDetail />
			</Modal>
		</main>
	);
};

export default MainBox;
