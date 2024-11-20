import { EMAIL_SUCCESS, EMAIL_FAILURE } from '../../utils/vars';

const initialState = {
	success: false,
	message: '',
};

const passwordReducer = (state = initialState, action) => {
	switch (action.type) {
		case EMAIL_SUCCESS:
			return { success: true, message: action.payload };
		case EMAIL_FAILURE:
			return { success: false, message: action.payload };
		default:
			return state;
	}
};

export default passwordReducer;
