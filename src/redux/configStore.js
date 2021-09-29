import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import addSentence from "./modules/addSentence";
import thunk from "redux-thunk";

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({ addSentence });

const store = createStore(rootReducer, enhancer);

export default store;
