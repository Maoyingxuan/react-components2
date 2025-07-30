import React from 'react'
import Router from "./Router"
import {createBrowserHistory} from "history"
export default function BrowserRouter({children}) {

  let historyRef = React.useRef()
  if(historyRef.current == null){
    historyRef.current = createBrowserHistory()
  }
  const history = historyRef.current
  return (
    <Router children = {children} navigator={history}></Router>
  )
}
