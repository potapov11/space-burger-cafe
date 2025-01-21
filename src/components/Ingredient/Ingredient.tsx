import React from 'react';
import { ItemConstructor } from '../../utils/types.tsx';
import IngredientCss from './Ingredient.module.css';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

interface Item {
	_id: string;
}

interface IngredientProps {
	dataStore: ItemConstructor[];
	item: Item;
	isModalOpen: boolean;
	image: string;
	name: string;
	price: number;
	openModal: () => void;
	_id: string;
}

const Ingredient: React.FC<IngredientProps> = (props): React.JSX.Element => {
	const { dataStore, image, name, price, item } = props;

	function count(store: ItemConstructor[], item: Item): number {
		let count = 0;

		if (store?.length > 0) {
			store.forEach((itemStore) => {
				if (itemStore._id === item._id) {
					count++;
				}
			});
		}
		return count;
	}

	const quantityNum = count(dataStore, item);

	const [, dragRef] = useDrag({
		type: 'ingr',
		item: { item },
		collect: (monitor) => {
			return {
				isDrag: monitor.isDragging(),
			};
		},
	});

	return (
		<>
			<li className={IngredientCss.ingredient} ref={dragRef}>
				{quantityNum > 0 && <Counter count={quantityNum} size="default" extraClass="m-1 counter-test" />}
				<div>
					<img src={image} alt={name} />
				</div>
				<div className={IngredientCss.textBox}>
					<p>
						<span className="text text_type_digits-default mb-1">{price}</span>
						<CurrencyIcon type="primary" />
					</p>
				</div>
				<p className={`text text_type_main-default ${IngredientCss.bottomText}`}>{name}</p>
			</li>
		</>
	);
};

export default Ingredient;
