import rootReducer from "./reducers/rootReducer";

import thunk from "redux-thunk";
const { legacy_createStore: createStore, applyMiddleware } = require("redux");

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;