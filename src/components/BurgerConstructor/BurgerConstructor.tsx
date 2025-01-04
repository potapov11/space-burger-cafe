import React from 'react';
import BurgerConstructorCss from './BurgerConstructor.module.css';
import { ItemConstructor } from '../../utils/types';
import TotalPrice from '../TotalPrice/TotalPrice';
import { removeIngredient } from '../../services/actions/constructor-action';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../main';
import { useDrop } from 'react-dnd';
import isEmpty from '../../utils/utils';
import DraggableIngredient from '../DraggableConstructorEl/DraggableConstructorEl';

interface BurgerMainIngredientsProps {
	openModal: () => void;
	handleDrop: (item: ItemConstructor) => void;
}

const BurgerMainIngredients: React.FC<BurgerMainIngredientsProps> = ({ openModal, handleDrop }): React.JSX.Element => {
	const dataConstructor = useSelector((store) => store.constructorReducer.constructorElems);
	const dispatch = useDispatch();

	const { bunItems, ingredients } = dataConstructor;
	const conditionArraysEmpty = isEmpty(bunItems) && isEmpty(ingredients);

	const [, dropTarget] = useDrop<ItemConstructor>({
		accept: 'ingr',
		drop(item: ItemConstructor) {
			if (item) {
				handleDrop(item);
			}
		},
	});

	const handleClose = (id, index) => {
		dispatch(removeIngredient([id, index]));
	};

	return (
		<section ref={dropTarget}>
			{conditionArraysEmpty ? (
				<div className={BurgerConstructorCss.emptyBox}>
					<p className="text text_type_main-large">Перенесите сюда булки и ингредиенты</p>
				</div>
			) : (
				<div className={BurgerConstructorCss.productsWrapper}>
					{bunItems?.length > 0 && (
						<ConstructorElement
							extraClass={`${BurgerConstructorCss.mr14} mb-4`}
							type="top"
							isLocked={true}
							text={`${bunItems[0].name} (верх)`}
							price={bunItems[0].price}
							thumbnail={bunItems[0].image}
							key={bunItems[0].uniqueId}
						/>
					)}
					<ul className={`${BurgerConstructorCss.constructorList} mt-4`}>
						{ingredients
							.filter((item) => item.type !== 'bun')
							.map((item, index) => (
								<DraggableIngredient key={item.uniqueId} item={item} index={index} handleClose={handleClose} />
							))}
					</ul>
					{bunItems?.length && (
						<ConstructorElement
							extraClass={`${BurgerConstructorCss.mr14} mb-4`}
							type="bottom"
							isLocked={true}
							text={`${bunItems[1].name} (низ)`}
							price={bunItems[1].price}
							thumbnail={bunItems[1].image}
							key={bunItems[1].uniqueId}
						/>
					)}
				</div>
			)}

			<TotalPrice openModal={openModal} />
		</section>
	);
};

export default BurgerMainIngredients;
