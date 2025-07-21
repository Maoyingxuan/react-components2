export default function createStore (reducer,enhancer) {
    let currentState
    let currentListeners = []
    if(enhancer){
        return enhancer(createStore)(reducer)
    }
    function getState(){
        return currentState
    }
    function dispatch(action){
        currentState = reducer(currentState,action)
        currentListeners.forEach(listener=>{
            listener()
        })
    }
    function subscribe(listener){
        currentListeners.push(listener)
        return () => {
            const index = currentListeners.indexOf(listener)
            currentListeners.splice(index,1)
        }
    }
    dispatch({type:'ADADAD'})
    return {getState,dispatch,subscribe}
}