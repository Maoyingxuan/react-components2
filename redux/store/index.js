import {createStore} from "../redux-nut"
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
export const store = createStore(countReducer)