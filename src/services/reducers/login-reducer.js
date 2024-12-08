import {
	LOGIN_USER,
	LOGIN_FAILURE,
	EMAIL_SUCCESS,
	EMAIL_FAILURE,
	REGISTER_USER,
	REGISTER_FAILURE,
	DATA_CHECK_USER,
	DATA_FETCH_ERROR,
	RESET_PASSWORD_SUCCESS,
	LOGOUT_USER,
	LOGOUT_FAILURE,
} from '../../utils/vars';

const initialState = {
	email: '',
	name: '',
	success: '',
	error: '',
	message: '',
	isAuthChecked: false,
};

const userReducer = (state = initialState, action) => {

	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
				email: action.payload.user.email,
				name: action.payload.user.name,
				success: action.payload.success,
				isAuthChecked: true,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				error: action.payload,
				isAuthChecked: false,
			};
		case EMAIL_SUCCESS:
			return { ...state, success: true, message: action.payload };
		case EMAIL_FAILURE:
			return { ...state, success: false, message: action.payload };
		case REGISTER_USER:
			return {
				...state,
				email: action.payload.user.email,
				password: action.payload.user.password,
				name: action.payload.user.name,
				isAuthChecked: true,
			};
		case REGISTER_FAILURE:
			return {
				...state,
				error: action.payload,
				isAuthChecked: false,
			};
		case DATA_CHECK_USER:
			return {
				...state,
				email: action.payload.user.email,
				name: action.payload.user.name,
				isAuthChecked: true,
			};
		case DATA_FETCH_ERROR:
			return {
				...state,
				isAuthChecked: true,
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				message: action.payload.message,
			};
		case LOGOUT_USER:
			return {
				email: '',
				name: '',
				success: '',
				error: '',
				isAuthChecked: true,
				message: action.payload.message,
			};
		case LOGOUT_FAILURE:
			return {
				...state,
				message: action.payload.message,
			};

		default:
			return state;
	}
};

export default userReducer;
