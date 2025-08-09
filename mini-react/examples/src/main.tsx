import {ReactDOM, useReducer} from "../whichreact"
import "./index.css";

let fragment1 = (
  <>
    <>
      <h3>1</h3>
    </>
    <h4>2</h4>
    <>o</>
  </>
);
function FunctionComponent({ name }: { name: string }) {
  const [count1, setCount1] = useReducer((x)=>x+1,0)
  return (
    <div>
    <button 
      onClick={()=>{
        setCount1()
      }}
    >{count1}
    </button>
    </div>
  );
}
const jsx = (
  <div className="box border">
    <FunctionComponent name="函数组件" />
    {fragment1}
    <h1 className="border">omg</h1>
    123
    <h2>react</h2>
    omg2
  </div>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(jsx);