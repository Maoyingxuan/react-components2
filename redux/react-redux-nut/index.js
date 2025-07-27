import React,{useSyncExternalStore} from "react"
import { useContext } from "react"
import { Provider } from "./Provider"
// Context传值 
// 1.创建context对象
export const Context = React.createContext()

export function useSelector(selector){
    const store = useContext(Context)
    const {getState,subscribe} = store
    // const selectedState = selector(getState())
    // return selectedState
    const state = useSyncExternalStore(subscribe,getState)
    const selectedState = selector(state)
    return selectedState
}

export function useDispatch(){
    const store = useContext(Context)
    const {dispatch} = store
    return dispatch
}