import PropTypes from 'prop-types';
import TotalPrice from '../TotalPrice/TotalPrice';
import { removeIngredient } from '../../services/actions/constructor-action';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCss from './BurgerConstructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import isEmpty from '../../utils/utils';
import DraggableIngredient from '../DraggableConstructorEl/DraggableConstructorEl';

console.log(isEmpty, 'sdfsdfsdISEMPTY');

const BurgerMainIngredients = ({ openModal, handleDrop }) => {
	const dataConstructor = useSelector((store) => store.constructorReducer.constructorElems);
	const dispatch = useDispatch();

	const { bunItems, ingredients } = dataConstructor;
	const conditionArraysEmpty = isEmpty(bunItems) && isEmpty(ingredients);

	const [, dropTarget] = useDrop({
		accept: 'ingr',
		drop(item) {
			handleDrop(item);
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
				<div className={BurgerConstructorCss.products}>
					<div className={BurgerConstructorCss.productsWrapper}>
						<ul className={`${BurgerConstructorCss.constructorList} mt-4`}>
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
							{ingredients
								.filter((item) => item.type !== 'bun')
								.map((item, index) => (
									<DraggableIngredient key={item.uniqueId} item={item} index={index} handleClose={handleClose} />
								))}
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
						</ul>
					</div>
				</div>
			)}

			<TotalPrice openModal={openModal} />
		</section>
	);
};

BurgerMainIngredients.propTypes = {
	openModal: PropTypes.func.isRequired,
	handleDrop: PropTypes.func.isRequired,
};

export default BurgerMainIngredients;
