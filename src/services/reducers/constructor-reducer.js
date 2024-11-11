import { ADD_INGREDIENT, REMOVE_INGREDIENT, MOVE_INGREDIENT, CLEAR_CONSRUCTOR } from '../../utils/vars';

const initialState = {
	constructorElems: {
		bunItems: [],
		ingredients: [],
	},
};

const constructorReducer = (state = initialState, action) => {
	const newIngredient = action.payload;

	const stateIngredients = state.constructorElems.ingredients;

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
				},
			};
		}

		case ADD_INGREDIENT: {
			const newIngredients = newIngredient;

			if (newIngredients?.[0]?.type === 'bun') {
				return {
					...state,
					constructorElems: {
						...state.constructorElems,
						bunItems: newIngredients,
					},
				};
			} else {
				if (!newIngredients) {
					return state;
				}
				return {
					...state,
					constructorElems: {
						...state.constructorElems,
						ingredients: [...stateIngredients, ...newIngredients],
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
