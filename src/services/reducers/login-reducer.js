import {
	LOGIN_USER,
	LOGIN_FAILURE,
	EMAIL_SUCCESS,
	EMAIL_FAILURE,
	REGISTER_USER,
	REGISTER_FAILURE,
	DATA_CHECK_USER,
	DATA_FETCH_ERROR,
	// RESET_PASSWORD_FAILURE,
	RESET_PASSWORD_SUCCESS,
	LOGOUT_USER,
	LOGOUT_FAILURE,
} from '../../utils/vars';
// import userReducer from './user-reducer';

const initialState = {
	email: '',
	name: '',
	success: '',
	error: '',
	message: '',
	isAuthChecked: false,
};

// userReducer

const userReducer = (state = initialState, action) => {
	console.log(action, 'action userReducer');

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

// import { EMAIL_SUCCESS, EMAIL_FAILURE } from '../../utils/vars';

// const initialState = {
// 	success: false,
// 	message: '',
// };

// const passwordReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case EMAIL_SUCCESS:
// 			return { success: true, message: action.payload };
// 		case EMAIL_FAILURE:
// 			return { success: false, message: action.payload };
// 		default:
// 			return state;
// 	}
// };

// export default passwordReducer;

// import { REGISTER_USER, REGISTER_FAILURE } from '../../utils/vars';

// const initialState = {
// 	email: '',
// 	password: '',
// 	name: '',
// 	error: '',
// };

// const registerReducer = (state = initialState, action) => {
// 	console.log(action, 'action');

// 	switch (action.type) {
// 		case REGISTER_USER:
// 			return {
// 				...state,
// 				email: action.payload.email,
// 				password: action.payload.password,
// 				name: action.payload.name,
// 				error: '',
// 			};
// 		case REGISTER_FAILURE:
// 			return {
// 				...state,
// 				error: action.payload,
// 			};

// 		default:
// 			return state;
// 	}
// };

// import { DATA_CHECK_USER } from '../../utils/vars';

// const initialState = {
// 	email: '',
// 	name: '',
// 	success: '',
// 	error: '',
// };

// const userReducer = (state = initialState, action) => {
// 	console.log(action, 'action');

// 	switch (action.type) {
// 		case DATA_CHECK_USER:
// 			return {
// 				...state,
// 			};
// 		default:
// 			return state;
// 	}
// };

// export default registerReducer;

export default userReducer;
