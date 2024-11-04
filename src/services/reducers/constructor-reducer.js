import { ADD_INGREDIENT } from '../../utils/vars';

const initialState = {
	constructorElems: {
		bunItems: null,
		ingredients: [],
	},
};

const constructorReducer = (state = initialState, action) => {
	const newIngredient = action.payload;
	console.log(newIngredient, '...newIngredient...');

	switch (action.type) {
		case ADD_INGREDIENT: {
			if (newIngredient.type === 'bun') {
				console.log('bun');
				console.log(initialState.constructorElems.bunItems, '...initialState.constructorElems.bunItems...');

				// Если это булка, обновляем соответствующее поле в состоянии
				return {
					...state,
					constructorElems: {
						...state.constructorElems,
						bunItems: newIngredient,
					},
				};
			} else {
				console.log('no-bun');
				// Если это не булка, добавляем его в массив ингредиентов
				return {
					...state,
					constructorElems: {
						...state.constructorElems,
						ingredients: [...state.constructorElems.ingredients, newIngredient],
					},
				};
			}
		}
		default:
			return state;
	}
};

export default constructorReducer;
