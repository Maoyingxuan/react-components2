import React, { useCallback } from 'react';
import { useDispatch, useSelector } from '../react-redux-nut';

export default function ReactReduxPage(){
    const count = useSelector(( { count }) => count);
    const dispatch = useDispatch()
    const add = useCallback(() => {
        dispatch({type: "ADD"})
    },[]      
    )
    return (
        <div>
            <h1>ReactReduxPage</h1>
            <button onClick={add}>{count}</button>
        </div>
    )
}