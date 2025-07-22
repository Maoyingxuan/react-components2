import {combineReducers, createStore} from '../redux-nut'
export function configureStore({reducer}){
    const rootReducer = combineReducers(reducer)
    const store = createStore(rootReducer)
    return store
}