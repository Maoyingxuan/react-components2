import {compose} from '../utils'
export default function applyMiddleware(...middlewares){
    return (createStore) => (reducer) => {
        const store = createStore(reducer)
        let dispatch = store.dispatch
        const midAPI = {
            getState: store.getState,
            dispatch: (action,...args)=>dispatch(action,...args)
        }
        const middlewareChain = middlewares.map(middleware=>{
            return middleware(midAPI)
        })
        //中间件加强dispatch
        dispatch = compose(...middlewareChain)(store.dispatch)
        return {...store,dispatch}
    }
}