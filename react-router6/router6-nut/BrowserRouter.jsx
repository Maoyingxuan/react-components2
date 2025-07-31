import React from 'react'
import Router from "./Router"
import {useState, useLayoutEffect} from "react"
import {createBrowserHistory} from "history"
export default function BrowserRouter({children}) {

  let historyRef = React.useRef()
  if(historyRef.current == null){
    historyRef.current = createBrowserHistory()
  }
  const history = historyRef.current
  const [state, setState] = useState({location: history.location})
  useLayoutEffect(()=>{
    history.listen(setState)
  },[history])
  return (
    <Router children = {children} navigator={history} location = {state.location}></Router>
  )
}
