import { REGISTER_USER, REGISTER_FAILURE } from '../../utils/vars';

const initialState = {
	email: '',
	password: '',
	name: '',
	error: '',
};

const registerReducer = (state = initialState, action) => {
	console.log(action, 'action');

	switch (action.type) {
		case REGISTER_USER:
			return {
				...state,
				email: action.payload.email,
				password: action.payload.password,
				name: action.payload.name,
				error: '',
			};
		case REGISTER_FAILURE:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default registerReducer;
