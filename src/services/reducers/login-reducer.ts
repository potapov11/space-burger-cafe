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

interface UserState {
	email: string;
	name: string;
	success: string;
	error: string;
	message: string;
	isAuthChecked: boolean;
}

// Определите типы действий
interface LoginUserAction {
	type: typeof LOGIN_USER;
	payload: {
		user: {
			email: string;
			name: string;
		};
		success: string;
	};
}

interface LoginFailureAction {
	type: typeof LOGIN_FAILURE;
	payload: string; // Ошибка
}

interface EmailSuccessAction {
	type: typeof EMAIL_SUCCESS;
	payload: string; // Сообщение
}

interface EmailFailureAction {
	type: typeof EMAIL_FAILURE;
	payload: string; // Сообщение
}

interface RegisterUserAction {
	type: typeof REGISTER_USER;
	payload: {
		user: {
			email: string;
			password: string; // Если нужно
			name: string;
		};
	};
}

interface RegisterFailureAction {
	type: typeof REGISTER_FAILURE;
	payload: string; // Ошибка
}

interface DataCheckUserAction {
	type: typeof DATA_CHECK_USER;
	payload: {
		user: {
			email: string;
			name: string;
		};
	};
}

interface DataFetchErrorAction {
	type: typeof DATA_FETCH_ERROR; // Нет payload
}

interface ResetPasswordSuccessAction {
	type: typeof RESET_PASSWORD_SUCCESS;
	payload: {
		message: string;
	};
}

interface LogoutUserAction {
	type: typeof LOGOUT_USER;
	payload: {
		message: string;
	};
}

interface LogoutFailureAction {
	type: typeof LOGOUT_FAILURE;
	payload: {
		message: string;
	};
}

type UserAction =
	| LoginUserAction
	| LoginFailureAction
	| EmailSuccessAction
	| EmailFailureAction
	| RegisterUserAction
	| RegisterFailureAction
	| DataCheckUserAction
	| DataFetchErrorAction
	| ResetPasswordSuccessAction
	| LogoutUserAction
	| LogoutFailureAction;

const initialState: UserState = {
	email: '',
	name: '',
	success: '',
	error: '',
	message: '',
	isAuthChecked: false,
};

const userReducer = (state = initialState, action: UserAction): UserState => {
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
			// Здесь нет payload, поэтому просто возвращаем состояние
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

// const userReducer = (state = initialState, action: UserAction): UserState => {
// 	switch (action.type) {
// 		case LOGIN_USER:
// 			return {
// 				...state,
// 				email: action.payload.user.email,
// 				name: action.payload.user.name,
// 				success: action.payload.success,
// 				isAuthChecked: true,
// 			};
// 		case LOGIN_FAILURE:
// 			return {
// 				...state,
// 				error: action.payload,
// 				isAuthChecked: false,
// 			};
// 		case EMAIL_SUCCESS:
// 			return { ...state, success: true, message: action.payload };
// 		case EMAIL_FAILURE:
// 			return { ...state, success: false, message: action.payload };
// 		case REGISTER_USER:
// 			return {
// 				...state,
// 				email: action.payload.user.email,
// 				name: action.payload.user.name,
// 				isAuthChecked: true,
// 			};
// 		case REGISTER_FAILURE:
// 			return {
// 				...state,
// 				error: action.payload,
// 				isAuthChecked: false,
// 			};
// 		case DATA_CHECK_USER:
// 			return {
// 				...state,
// 				email: action.payload.user.email,
// 				name: action.payload.user.name,
// 				isAuthChecked: true,
// 			};
// 		case DATA_FETCH_ERROR:
// 			return {
// 				...state,
// 				isAuthChecked: true,
// 			};
// 		case RESET_PASSWORD_SUCCESS:
// 			return {
// 				...state,
// 				message: action.payload.message,
// 			};
// 		case LOGOUT_USER:
// 			return {
// 				email: '',
// 				name: '',
// 				success: '',
// 				error: '',
// 				isAuthChecked: true,
// 				message: action.payload.message,
// 			};
// 		case LOGOUT_FAILURE:
// 			return {
// 				...state,
// 				message: action.payload.message,
// 			};
// 		default:
// 			return state;
// 	}
// };

export default userReducer;
