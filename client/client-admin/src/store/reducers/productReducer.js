import * as types from "../actions/actionType";

const initialState = {
	products: [],
};

export default function productReducer(state = initialState, action) {
	const { type, payload } = action;
	let newState = {};
	switch (type) {
		case types.FETCH_ALL_PRODUCTS:
			newState = {
				...state,
				products: payload,
			};
			return newState;
		default:
			return state;
	}
}
