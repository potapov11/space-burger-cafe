import { v4 as uuidv4 } from 'uuid';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, COUNT_TOTAL, MOVE_INGREDIENT, CLEAR_CONSRUCTOR } from '../../utils/vars';

const initialState = {
	constructorElems: {
		bunItems: [],
		ingredients: [],
		allPrice: 0,
	},
};

const constructorReducer = (state = initialState, action) => {
	const newIngredient = action.payload;
	const stateIngredients = state.constructorElems.ingredients;
	const stateBunItems = state.constructorElems.bunItems;

	const calculateTotalPrice = (ingredients, bun) => {
		const bunPrice = Array.isArray(bun) ? bun.reduce((total, item) => total + (item.price || 0), 0) : bun && bun.price ? bun.price : 0;
		const ingredientsPrice = ingredients.reduce((total, item) => total + (item.price || 0), 0);

		return bunPrice + ingredientsPrice;
	};

	switch (action.type) {
		case MOVE_INGREDIENT: {
			const { fromIndex, toIndex } = newIngredient;

			if (fromIndex === toIndex) {
				return state;
			}

			const updatedIngredients = [...stateIngredients];

			const [movedIngredient] = updatedIngredients.splice(fromIndex, 1);
			updatedIngredients.splice(toIndex, 0, movedIngredient);

			return {
				...state,
				constructorElems: {
					...state.constructorElems,
					ingredients: updatedIngredients,
					allPrice: calculateTotalPrice(updatedIngredients, stateBunItems),
				},
			};
		}

		case ADD_INGREDIENT: {
			const uniqId1 = uuidv4();
			const uniqId2 = uuidv4();

			if (newIngredient?.type === 'bun') {
				return {
					...state,
					constructorElems: {
						...state.constructorElems,
						bunItems: [
							{ ...newIngredient, uniqueId: uniqId1 },
							{ ...newIngredient, uniqueId: uniqId2 },
						],
						allPrice: calculateTotalPrice(stateIngredients, newIngredient),
					},
				};
			} else {
				if (!newIngredient) {
					return state;
				}
				return {
					...state,
					constructorElems: {
						...state.constructorElems,
						ingredients: [...stateIngredients, { ...newIngredient, uniqueId: uuidv4() }],
						allPrice: calculateTotalPrice([...stateIngredients, newIngredient], stateBunItems),
					},
				};
			}
		}

		case REMOVE_INGREDIENT: {
			const [id, index] = action.payload;

			const filteredArrIngredient = stateIngredients.filter((item, i) => !(i === index && item._id === id));

			return {
				...state,
				constructorElems: {
					...state.constructorElems,
					ingredients: filteredArrIngredient,
					allPrice: calculateTotalPrice(filteredArrIngredient, stateBunItems),
				},
			};
		}
		case COUNT_TOTAL: {
			return {
				...state,
				constructorElems: {
					...state.constructorElems,
					allPrice: calculateTotalPrice(stateIngredients, stateBunItems), // Пересчитываем общую цену
				},
			};
		}
		case CLEAR_CONSRUCTOR: {
			return initialState;
		}

		default:
			return state;
	}
};

export default constructorReducer;
