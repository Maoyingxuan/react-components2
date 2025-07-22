import { useEffect, useState } from 'react';
import store from '../store/rtkSore'
import { increment } from '../store/counterSlice';
export default function RtkPage(){
    const [state, setState] = useState(store.getState().counter.value);
    const add = () => {
        store.dispatch(increment())
    }
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState().counter.value);
        });
        return () => unsubscribe();
    }, []);
    return(
        <div>
            <h3>RtkPage</h3>
            <p>{state}</p>
            <button onClick={add}>add</button>
        </div>
    )
}