import { ADD_INGREDIENT, REMOVE_INGREDIENT, COUNT_TOTAL, ADD_BUN } from '../../utils/vars';

const initialState = {
	constructorElems: {
		bunItems: null,
		ingredients: [],
		allPrice: 0, // Изначально цена равна 0
	},
};

const constructorReducer = (state = initialState, action) => {
	const newIngredient = action.payload;
	const stateIngredients = state.constructorElems.ingredients;
	const stateBunItems = state.constructorElems.bunItems;

	const calculateTotalPrice = (ingredients, bun) => {
		const bunPrice = bun ? bun.price : 0;
		const ingredientsPrice = ingredients.reduce((total, item) => total + item.price, 0);
		return bunPrice * 2 + ingredientsPrice;
	};

	switch (action.type) {
		case ADD_BUN: {
			return {
				...state,
				constructorElems: {
					...state.constructorElems,
					bunItems: action.payload,
				},
			};
		}
		case ADD_INGREDIENT: {
			if (newIngredient.type === 'bun') {
				return {
					...state,
					constructorElems: {
						...state.constructorElems,
						bunItems: newIngredient,
						allPrice: calculateTotalPrice(stateIngredients, newIngredient), // Обновляем общую цену
					},
				};
			} else {
				return {
					...state,
					constructorElems: {
						...state.constructorElems,
						ingredients: [...stateIngredients, newIngredient],
						allPrice: calculateTotalPrice([...stateIngredients, newIngredient], stateBunItems), // Обновляем общую цену
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
					allPrice: calculateTotalPrice(filteredArrIngredient, stateBunItems), // Обновляем общую цену
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
		default:
			return state;
	}
};

export default constructorReducer;
