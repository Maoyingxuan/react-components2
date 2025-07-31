// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Link,
//   Outlet,
//   useParams,
//   useNavigate
// } from "react-router-dom";
import { BrowserRouter,Route,Routes,Link,Outlet,useNavigate,useParams } from "../router6-nut";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path="product" element={<Product />} >
              <Route path=":id" element={<ProductDetail></ProductDetail>}></Route>
            </Route>
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() {
  return (
    <div className="border">
      <h3>Layout</h3>
      <Link to="/">首页</Link>
      <Link to="/product">商品</Link>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
function Product() {
  return (
    <div>
      <h1>Product</h1>
        <Link to="/product/123">商品123</Link>
      <Outlet/>
    </div>
  );
}
function ProductDetail() {
  const param = useParams()
  let navigate = useNavigate()
  return (
    <div>
      <h1>Product{param.id}</h1>
      <button onClick={()=>navigate("/")}>go home</button>
    </div>
  );
}

// function NoMatch(){
//   return(
//     <div>404 Not Found</div>
//   )
// }