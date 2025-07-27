import ReduxPage from '../pages/reduxPage'
import RtkPage from '../pages/rtkPage'
import  ReactReduxPage  from '../pages/reactReduxPage'
function App() {
  return (
    <>
    {/* <ReduxPage></ReduxPage> */}
    {/* <RtkPage></RtkPage> */}
    <ReactReduxPage></ReactReduxPage>
    </>
  )
}

export default App

// import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";

// export default function APP() {
//   console.log('1')
//   const [count, setCount] = useState(0);

//   const logCount = useCallback(() => {
//     // console.log("useCallback count:", count);
//   }, [count]);

//   useEffect(() => {
//     console.log('2')
//   }, [count,logCount]); // 注意这里只监听 logCount
//   useLayoutEffect(() => {
//     console.log('3')
//   }, [count,logCount]); // 注意这里只监听 logCount
//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(c => c + 1)}>Increment</button>
//     </div>
//   );
// }
