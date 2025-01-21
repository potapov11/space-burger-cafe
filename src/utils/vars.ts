const baseURL: string = 'https://norma.nomoreparties.space/api/';
const keyButton: string = 'Escape';
const modalRoot: HTMLElement | null = document.getElementById('modal-root');

const SET_ROLLS_ARRAY: string = 'SET_ROLLS_ARRAY';
const SET_SAUCE_ARRAY: string = 'SET_SAUCE_ARRAY';
const SET_MAIN_ARRAY: string = 'SET_MAIN_ARRAY';
const ADD_INGREDIENT: string = 'ADD_INGREDIENT';
const REMOVE_INGREDIENT: string = 'REMOVE_INGREDIENT';
const ADD_MODAL_INGREDIENT: string = 'ADD_MODAL_INGREDIENT';
const CLEAR_MODAL_INGREDIENT: string = 'CLEAR_MODAL_INGREDIENT';
const ADD_BUN: string = 'ADD_BUN';
const MOVE_INGREDIENT: string = 'MOVE_INGREDIENT';
const ADD_ORDER_DETAIL: string = 'ADD_ORDER_DETAIL';
const CLEAR_ORDER_DETAIL: string = 'CLEAR_ORDER_DETAIL';
const ORDER_SUCCESS: string = 'ORDER_SUCCESS';
const ORDER_FAILURE: string = 'ORDER_FAILURE';
const CLEAR_CONSRUCTOR: string = 'CLEAR_CONSRUCTOR';
const EMAIL_SUCCESS: string = 'EMAIL_SUCCESS';
const EMAIL_FAILURE: string = 'EMAIL_FAILURE';
const REGISTER_USER: string = 'REGISTER_USER';
const REGISTER_FAILURE: string = 'REGISTER_FAILURE';
const LOGIN_USER: string = 'LOGIN_USER';
const LOGIN_FAILURE: string = 'LOGIN_FAILURE';
const DATA_CHECK_USER: string = 'DATA_CHECK_USER';
const DATA_FETCH_ERROR: string = 'DATA_FETCH_ERROR';
const RESET_PASSWORD_SUCCESS: string = 'RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAILURE: string = 'RESET_PASSWORD_FAILURE';
const LOGOUT_USER: string = 'LOGOUT_USERE';
const LOGOUT_FAILURE: string = 'LOGOUT_FAILURE';
// const FEED_SOCKET_URL_All: string = 'wss://norma.nomoreparties.space/orders/all';
const ORDERS_SOCKET = 'wss://norma.nomoreparties.space/orders';

const mb40: { marginBottom: string } = {
	marginBottom: '40px',
};

const mt40: { marginTop: string } = {
	marginTop: '40px',
};

const initialStateConstructor = {
	constructorElems: {
		bunItems: [],
		ingredients: [
			{
				_id: '1',
				name: 'Биокотлета из марсианской Магнолии',
				type: 'main',
				proteins: 420,
				fat: 142,
				carbohydrates: 242,
				calories: 4242,
				price: 424,
				image: 'https://code.s3.yandex.net/react/code/meat-01.png',
				image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
				__v: 0,
			},
			{
				_id: '2',
				name: 'Биокотлета из чего то еще',
				type: 'main',
				proteins: 420,
				fat: 142,
				carbohydrates: 242,
				calories: 4242,
				price: 424,
				image: 'https://code.s3.yandex.net/react/code/meat-01.png',
				image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
				__v: 0,
			},
		],
	},
};

const testObject = {
	_id: '1',
	name: 'Биокотлета из марсианской Магнолии',
	type: 'main',
	proteins: 420,
	fat: 142,
	carbohydrates: 242,
	calories: 4242,
	price: 424,
	image: 'https://code.s3.yandex.net/react/code/meat-01.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
	__v: 0,
};

const testArray = [
	{
		_id: '1',
		name: 'Биокотлета из марсианской Магнолии',
		type: 'main',
		proteins: 420,
		fat: 142,
		carbohydrates: 242,
		calories: 4242,
		price: 424,
		image: 'https://code.s3.yandex.net/react/code/meat-01.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
		__v: 0,
	},
	{
		_id: '2',
		name: 'Биокотлета из марсианской Магнолии',
		type: 'main',
		proteins: 420,
		fat: 142,
		carbohydrates: 242,
		calories: 4242,
		price: 424,
		image: 'https://code.s3.yandex.net/react/code/meat-01.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
		__v: 0,
	},
];

const testSelectors = {
	constructorTarget: '[data-test="constructor-target-selector"]',
	orderButton: 'button:contains("Оформить заказ")',
	constructorElement: '.constructor-element',
	bun: 'li:contains("Краторная булка")',
	counter: '.counter',
	liIngredient: 'li[class^="_ingredient"]',
	modalIdRoot: '#modal-root',
	productBox: 'ul[class*=_productsBox_]',
	constructorBox: '[data-test="constructor-target-selector"]',
};

export {
	keyButton,
	mt40,
	mb40,
	SET_MAIN_ARRAY,
	SET_SAUCE_ARRAY,
	ADD_BUN,
	SET_ROLLS_ARRAY,
	CLEAR_MODAL_INGREDIENT,
	ADD_INGREDIENT,
	ADD_MODAL_INGREDIENT,
	REMOVE_INGREDIENT,
	MOVE_INGREDIENT,
	ADD_ORDER_DETAIL,
	CLEAR_ORDER_DETAIL,
	ORDER_SUCCESS,
	ORDER_FAILURE,
	baseURL,
	modalRoot,
	CLEAR_CONSRUCTOR,
	EMAIL_SUCCESS,
	EMAIL_FAILURE,
	REGISTER_USER,
	REGISTER_FAILURE,
	LOGIN_USER,
	LOGIN_FAILURE,
	DATA_CHECK_USER,
	DATA_FETCH_ERROR,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILURE,
	LOGOUT_USER,
	LOGOUT_FAILURE,
	ORDERS_SOCKET,
	initialStateConstructor,
	testArray,
	testSelectors,
	testObject,
};
