import React from 'react';
import MainBoxCss from './MainBox.module.css';
import Modal from '../Modal/Modal';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const MainBox = () => {
	const [isModalOpen, setModalOpen] = React.useState(false);
	const [selectedIngredient, setSelectedIngredient] = React.useState(null);

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
		console.log('closeModal');
		document.body.classList.remove('overlay-modal');
		document.body.style.marginRight = '';
		setModalOpen(false);
	};

	React.useEffect(() => {
		console.log(selectedIngredient, '...selectedIngredient.......');
	}, [selectedIngredient]);

	return (
		<main className={MainBoxCss.main}>
			<div className={`${MainBoxCss.container} container`}>
				<BurgerIngredients isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} selectedIngredient={selectedIngredient} />
				<BurgerConstructor />
			</div>
			{selectedIngredient && (
				<Modal isModalOpen={isModalOpen} onClose={closeModal}>
					<p className="text text_type_main-medium">Детали ингредиента</p>
					<div className="modal-info">
						<div className="modal-image-box">
							<img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
						</div>
						<p className="text text_type_main-medium modal-name">{selectedIngredient.name}</p>
						<div className="modal-energy-info">
							<div className="modal-energy-inner">
								<p className="modal-energy-text text text_type_main-default text_color_inactive">Калории,ккал</p>
								<p className="modal-energy-subtext text text_type_digits-default text_color_inactive mt-2">{selectedIngredient.calories}</p>
							</div>
							<div className="modal-energy-inner">
								<p className="modal-energy-text text text_type_main-default text_color_inactive">Белки, г</p>
								<p className="modal-energy-subtext text text_type_digits-default text_color_inactive mt-2">{selectedIngredient.proteins}</p>
							</div>
							<div className="modal-energy-inner">
								<p className="modal-energy-text text text_type_main-default text_color_inactive">Жиры, г</p>
								<p className="modal-energy-subtext text text_type_digits-default text_color_inactive mt-2">{selectedIngredient.fat}</p>
							</div>
							<div className="modal-energy-inner">
								<p className="modal-energy-text text text_type_main-default text_color_inactive">Углеводы, г</p>
								<p className="modal-energy-subtext text text_type_digits-default text_color_inactive mt-2">{selectedIngredient.carbohydrates}</p>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</main>
	);
};

export default MainBox;
