const initialState = {
	rollsArray: [],
	sauceArray: [],
	mainArray: [],
};

const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ROLLS_ARRAY':
			return { ...state, rollsArray: action.payload };
		case 'SET_SAUCE_ARRAY':
			return { ...state, sauceArray: action.payload };
		case 'SET_MAIN_ARRAY':
			return { ...state, mainArray: action.payload };
		default:
			return state;
	}
};

export default dataReducer;
