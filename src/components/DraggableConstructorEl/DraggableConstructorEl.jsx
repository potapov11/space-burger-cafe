import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCss from '../BurgerConstructor/BurgerConstructor.module.css';
import { moveIngredient } from '../../services/actions/constructor-action';
import { useDispatch } from 'react-redux';
import { IngredientType } from '../../utils/types';
import { useDrag, useDrop } from 'react-dnd';

const DraggableIngredient = ({ item, index, handleClose }) => {
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
		hover: (draggedItem) => {
			if (draggedItem.index !== index) {
				const newIndex = index;
				dispatch(moveIngredient(draggedItem.index, newIndex));
				draggedItem.index = newIndex;
			}
		},
	});

	return (
		<li className={`${BurgerConstructorCss.constructorListItem} mb-4 ${isDragging ? BurgerConstructorCss.dragging : ''}`} ref={(node) => dragRef(dropRef(node))} key={item.uniqueId}>
			<DragIcon type="primary" />
			<ConstructorElement text={item.name} price={item.price} thumbnail={item.image} handleClose={() => handleClose(item._id, index)} />
		</li>
	);
};

DraggableIngredient.propTypes = {
	item: IngredientType,
	index: PropTypes.number,
	handleClose: PropTypes.func,
};

export default DraggableIngredient;
