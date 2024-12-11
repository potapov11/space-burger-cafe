import React from 'react';
import { ItemConstructor } from '../../utils/types.tsx';
import { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IngredientBoxCss from './IngredientBoxCss.module.css';
import Ingredient from '../Ingredient/Ingredient';

interface Item {
	_id: string;
	image: string;
	name: string;
	price: number;
}

interface IngredientBoxProps {
	dataStore: ItemConstructor[];
	data: Item[];
	title: string;
	isModalOpen: boolean;
	openModal: () => void;
}

const IngredientBox = forwardRef<HTMLDivElement, IngredientBoxProps>(({ dataStore, data, title, isModalOpen, openModal }, ref): React.JSX.Element => {
	const location = useLocation();

	return (
		<div ref={ref} className={IngredientBoxCss.ingredientBox}>
			<h3 className="text text_type_main-medium mb-6">{title}</h3>
			<ul className={IngredientBoxCss.productsBox}>
				{data?.length > 0 &&
					data.map((item) => (
						<Link className={IngredientBoxCss.link} key={item._id} to={`/ingredients/${item._id}`} state={{ background: location }}>
							<Ingredient dataStore={dataStore} key={item._id} item={item} {...item} isModalOpen={isModalOpen} openModal={openModal} />
						</Link>
					))}
			</ul>
		</div>
	);
});

IngredientBox.displayName = 'IngredientBox';

export default IngredientBox;
