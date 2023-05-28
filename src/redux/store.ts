import { createStore } from "redux";
import marketReducer from "./reducers/market";

const store = createStore(marketReducer);

export default store;