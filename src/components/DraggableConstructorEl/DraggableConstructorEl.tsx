import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCss from '../BurgerConstructor/BurgerConstructor.module.css';
import { moveIngredient } from '../../services/actions/constructor-action';
import { useDispatch } from '../../hooks/useDispatch';
import { DraggedItem } from '../../utils/types.tsx';
import { useDrag, useDrop } from 'react-dnd';

interface DraggableIngredientProps {
	item: DraggedItem;
	index: number;
	key: string;
	handleClose: (id: string, index: number) => void;
}

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({ item, index, handleClose }): React.JSX.Element => {
	const dispatch = useDispatch();

	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingr',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, dropRef] = useDrop({
		accept: 'ingr',
		hover: (draggedItem: DraggedItem) => {
			const fromIndex = draggedItem.index !== undefined ? draggedItem.index : 0;

			if (fromIndex !== index) {
				const newIndex = index;
				dispatch(moveIngredient(fromIndex, newIndex));
				draggedItem.index = newIndex;
			}
		},
	});

	return (
		<li className={`${BurgerConstructorCss.constructorListItem} mb-4 ${isDragging ? BurgerConstructorCss.dragging : ''}`} ref={(node) => dragRef(dropRef(node))}>
			<DragIcon type="primary" />
			<ConstructorElement text={item.name} price={item.price} thumbnail={item.image} handleClose={() => handleClose(item._id, index)} />
		</li>
	);
};

export default DraggableIngredient;
