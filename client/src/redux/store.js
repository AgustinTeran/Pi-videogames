import {createStore, compose, applyMiddleware} from "redux"
import thunkMiddleware from "redux-thunk"
import Reducer from "./reducer"

var composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

var store = createStore(Reducer,composeEnhancer(applyMiddleware(thunkMiddleware)))
export default store