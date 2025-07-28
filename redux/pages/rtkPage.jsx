import { useEffect, useState } from 'react';
import store from '../store/rtkSore'
import { increment, incrementByAmount } from '../store/counterSlice';
export default function RtkPage(){
    const [state, setState] = useState(store.getState().counter.value);
    const add = () => {
        store.dispatch(increment())
    }
    const add100 = () => {
        store.dispatch(incrementByAmount(100))
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
            <button onClick={add100}>add100</button>
            <button onClick={()=>store.dispatch({type:"counter/increment"})}>add</button>
        </div>
    )
}