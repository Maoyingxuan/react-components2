import {createReducer} from '@reduxjs/toolkit'
export function createSlice({name,initialState,reducers}){
    const reducerNames = Object.keys(reducers)
    const actionCreators = {}
    const sliceCaseReducerByType = {}
    reducerNames.forEach(reducerName=>{
        const r = reducers[reducerName]
        const type = `${name}/${reducerName}`
        sliceCaseReducerByType[type] = r
        actionCreators[reducerName] = createAction(type)
    })
    let _reducer
    function buildReducer(){
    return createReducer(initialState,(builder)=>{
        for(let key in sliceCaseReducerByType)
        builder.addCase(key,sliceCaseReducerByType[key])
    })
}
    return{
        name,
        actions:actionCreators,
        reducer: (state,action)=>{
            if(!_reducer){
                _reducer = buildReducer()
            }
            return _reducer(state,action)
        }
    }
}

function createAction(type){
    function creator(...args){
        return {
            type,
            payload: args[0]
        }
    }
    creator.type = type
    return creator
}
