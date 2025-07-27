import { useEffect, useState } from 'react';
import {store} from '../store'
export default function ReduxPage(){
    const [state, setState] = useState(store.getState().count);
    const add = () => {
        store.dispatch({type: 'ADD'})
    }
    const minus = () => {
        store.dispatch({type: 'Minus'})
    }
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState().count);
        });
        return () => unsubscribe();
    }, []);
    return(
        <div>
            <h3>ReduxPage</h3>
            <p>{state}</p>
            <button onClick={add}>add</button>
        </div>
    )
}