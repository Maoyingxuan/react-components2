import {useBearStore} from '../store';

export default function BearsPage() {
  const bears = useBearStore()
  const {bear,increase,decrease,reset,count,increasecount} = bears
  return (
    <div>
      <h1>Bears: {bear}</h1>
      <button onClick={() => increase()}>Increase</button>
        <button onClick={() => decrease()}>Decrease</button>
        <button onClick={reset}>Reset</button>
        <h1>Count: {count}</h1>
        <button onClick={()=>increasecount()}>Increase Count</button>
    </div>
  );
}