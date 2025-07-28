// import {createReducer} from '@reduxjs/toolkit'
import {produce }from "immer"
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

function createReducer(initialState,mapOrBuilderCallback){
    let [actionMap] = executeReducerBuilderCallback(mapOrBuilderCallback)
    // actionMap就是 counter/increment: reducer .....
    function reducer(state = initialState,action){
        const caseReducers = [actionMap[action.type]]
        return caseReducers.reduce((previousState,caseReducer)=>{
            if(caseReducer){
                return produce(previousState,(draft)=>{
                    return caseReducer(draft,action)
                })
            }
            return previousState
        },state)
    }
    return reducer
    }
    function executeReducerBuilderCallback(mapOrBuilderCallback){
        const actionsMap = {};
        const builder = {
            addCase: (type, reducer) => {
            actionsMap[type] = reducer;
            return builder;
            },
        };
        mapOrBuilderCallback(builder);
        return [actionsMap];
}
