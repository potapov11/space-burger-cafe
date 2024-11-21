import { LOGIN_USER, LOGIN_FAILURE } from '../../utils/vars';

const initialState = {
	email: '',
	name: '',
	success: '',
	error: '',
};

const loginReducer = (state = initialState, action) => {
	console.log(action, 'action');

	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
				email: action.payload.user.email,
				name: action.payload.user.name,
				success: action.payload.success,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default loginReducer;
