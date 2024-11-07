const serverURL = 'https://norma.nomoreparties.space/api/ingredients';
const serverOrderURL = 'https://norma.nomoreparties.space/api/orders';
const keyButton = 'Escape';

const SET_ROLLS_ARRAY = 'SET_ROLLS_ARRAY';
const SET_SAUCE_ARRAY = 'SET_SAUCE_ARRAY';
const SET_MAIN_ARRAY = 'SET_MAIN_ARRAY';
const ADD_INGREDIENT = 'ADD_INGREDIENT';
const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
const ADD_MODAL_INGREDIENT = 'ADD_MODAL_INGREDIENT';
const CLEAR_MODAL_INGREDIENT = 'CLEAR_MODAL_INGREDIENT';
const COUNT_TOTAL = 'COUNT_TOTAL';
const ADD_BUN = 'ADD_BUN';
const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
const ADD_ODER_DETAIL = 'ADD_ODER_DETAIL';
const CLEAR_ORDER_DETAIL = 'CLEAR_ODER_DETAIL';
const ORDER_SUCCESS = 'ORDER_SUCCESS';
const ORDER_FAILURE = 'ORDER_FAILURE';

const BUN_ITEM = {
	_id: '643d69a5c3f7b9001cfa093c',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0,
};

const mb40 = {
	marginBottom: '40px',
};

const mt40 = {
	marginTop: '40px',
};

export {
	serverURL,
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
	BUN_ITEM,
	REMOVE_INGREDIENT,
	COUNT_TOTAL,
	MOVE_INGREDIENT,
	ADD_ODER_DETAIL,
	CLEAR_ORDER_DETAIL,
	ORDER_SUCCESS,
	ORDER_FAILURE,
	serverOrderURL,
};
