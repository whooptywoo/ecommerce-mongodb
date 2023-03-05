import * as types from "./actionType";
const baseUrl = "http://localhost:4000/";

export const login = (input) => {
	let url = baseUrl + "login";
	return (dispatch) => {
		return fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(input),
		}).then((response) => {
			if (!response.ok) {
				return response.json().then((text) => {
					throw new Error(text.message);
				});
			} else {
				return response.json().then((data) => {
					localStorage.setItem("access_token", data.access_token);
					return data;
				});
			}
		});
	};
};

const fetchProductsSuccess = (payload) => {
	return {
		type: types.FETCH_ALL_PRODUCTS,
		payload,
	};
};

export const fetchProducts = () => {
	return (dispatch) => {
		return fetch(baseUrl + "products")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				dispatch(fetchProductsSuccess(data));
			})
			.catch((error) => console.log(error));
	};
};

export const addProduct = (input) => {
	console.log(input);
	return (dispatch) => {
		return fetch(baseUrl + "products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				access_token: localStorage.access_token,
			},
			body: JSON.stringify(input),
		}).then((response) => {
			if (!response.ok) {
				return response.json().then((text) => {
					throw new Error(text.message);
				});
			} else {
				return response.json().then((data) => {
					return data;
				});
			}
		});
	};
};

export const deleteProduct = (id) => {
	return (dispatch) => {
		return fetch(baseUrl + "products/" + id, {
			method: "DELETE",
			headers: {
				access_token: localStorage.access_token,
			},
		}).then((response) => {
			if (!response.ok) {
				return response.json().then((text) => {
					throw new Error(text.message);
				});
			} else {
				return response.json().then((data) => {
					return data;
				});
			}
		});
	};
};

export const editProduct = (input, id) => {
	return (dispatch) => {
		return fetch(baseUrl + "products/" + id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				access_token: localStorage.access_token,
			},
			body: JSON.stringify(input),
		}).then((response) => {
			if (!response.ok) {
				return response.json().then((text) => {
					throw new Error(text.message);
				});
			} else {
				return response.json().then((data) => {
					return data;
				});
			}
		});
	};
};
