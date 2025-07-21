// import {createStore,applyMiddleware} from "../redux-nut"
import {applyMiddleware, createStore,combineReducers} from "redux"
import {thunk} from "redux-thunk"
// import {logger} from "redux-logger"
// eslint-disable-next-line no-unused-vars
function logger({getState,dispatch}){
 return next => action => {
    console.log('----------')
    console.log(action.type)
    const prevState = getState()
    console.log('prev:', prevState)
    const returnValue = next(action)
    console.log('----------')
    const nextState = getState()
    console.log('next:', nextState)
    return returnValue
 }
}
function countReducer(state = 0, action){
    switch(action.type){
        case "ADD":
            return state + 1
        case "Minus":
            return state - 1
        default:
            return state
    }
}
export const store = createStore(
    combineReducers({count:countReducer}),
    applyMiddleware(thunk,logger))