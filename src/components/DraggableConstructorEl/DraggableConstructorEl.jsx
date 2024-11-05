import React, { useCallback } from 'react';
// import PropTypes from 'prop-types';
// import TotalPrice from '../TotalPrice/TotalPrice';
// import { removeIngredient } from '../../services/actions/constructor-action';
// import { addBun } from '../../services/actions/constructor-action';
// import { BUN_ITEM } from '../../utils/vars';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCss from '../BurgerConstructor/BurgerConstructor.module.css';
import { moveIngredient } from '../../services/actions/constructor-action';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

const DraggableIngredient = ({ item, index, handleClose }) => {
	const dispatch = useDispatch();
	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingr',
		item: { index }, // Передаем только index для перемещения
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, dropRef] = useDrop({
		accept: 'ingr',
		hover: (draggedItem) => {
			if (draggedItem.index !== index) {
				dispatch(moveIngredient(draggedItem.index, index));
				draggedItem.index = index; // Обновляем индекс перетаскиваемого элемента
			}
		},
	});

	return (
		<li className={`${BurgerConstructorCss.constructorListItem} mb-4 ${isDragging ? BurgerConstructorCss.dragging : ''}`} ref={(node) => dragRef(dropRef(node))} key={item._id}>
			<DragIcon type="primary" />
			<ConstructorElement text={item.name} price={item.price} thumbnail={item.image} handleClose={() => handleClose(item._id, index)} />
		</li>
	);
};

export default DraggableIngredient;

// const BurgerConstructor = ({ ingredients, topBun, bottomBun, handleClose, openModal }) => {
// 	const moveIngredient = useCallback(
// 		(fromIndex, toIndex) => {
// 			const updatedIngredients = [...ingredients];
// 			const [movedIngredient] = updatedIngredients.splice(fromIndex, 1);
// 			updatedIngredients.splice(toIndex, 0, movedIngredient);
// 			// Здесь нужно обновить состояние ingredients, например, с помощью useState
// 			// setIngredients(updatedIngredients);
// 		},
// 		[ingredients],
// 	);

// 	return (
// 		<section>
// 			<div className="products">
// 				<div className={BurgerConstructorCss.productsWrapper}>
// 					<ul className={`${BurgerConstructorCss.constructorList} mt-4`}>
// 						{topBun}
// 						{ingredients
// 							.filter((item) => item.type !== 'bun')
// 							.map((item, index) => (
// 								<DraggableIngredient key={item._id} item={item} index={index} moveIngredient={moveIngredient} handleClose={handleClose} />
// 							))}
// 						{bottomBun}
// 					</ul>
// 				</div>
// 			</div>
// 			<TotalPrice openModal={openModal} />
// 		</section>
// 	);
// };

// export default BurgerConstructor;
