import * as types from "../actions/actionType";

const initialState = {
	users: [],
};

export default function userReducer(state = initialState, action) {
	const { type, payload } = action;
	let newState = {};
	switch (type) {
		case types.FETCH_ALL_USERS:
			newState = {
				...state,
				users: payload,
			};
			return newState;
		default:
			return state;
	}
}
