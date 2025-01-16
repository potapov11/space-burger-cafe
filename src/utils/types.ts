import { store } from '../main';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TBurgerConstructorActions } from '../services/actions/constructor-action';
import { TModalIngredientActions } from '../services/actions/modal-ingredient-action';
import { TOrderActions } from '../services/actions/order-modal-action';
import { TWSActions, TWSAuthActions } from '../services/actions/socket-action';

export type RootState = ReturnType<typeof store.getState>;

export interface IUser {
	name: string;
	email: string;
	password: string;
}

export type TAuthState = {
	error: boolean | null | string;
	loading: boolean;
	accessToken: string | undefined;
	refreshToken: string | undefined;
	user: IUser;
};

export interface ItemConstructor {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	uniqueId?: string;
}

export interface DraggedItem extends ItemConstructor {
	index?: number;
}

export type TAppActions = TBurgerConstructorActions | TModalIngredientActions | TOrderActions | TWSActions | TWSAuthActions;

export interface serverResponseResetPassword {
	success: boolean;
	message: string;
}

export interface IWSActions {
	wsInit: string;
	onOpen: string;
	onClose: string;
	onError: string;
	onMessage: string;
}

export interface IWSOrdersPayload {
	success?: boolean;
	orders: Array<IWSOrder>;
	total: number;
	totalToday: number;
}

export interface IWSOrder {
	ingredients: Array<string>;
	name: string;
	_id: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
}

// export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, Action, TAppActions>>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
