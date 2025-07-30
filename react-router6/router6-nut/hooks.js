import React from "react"
import { NavigationContext } from "./Context"
export function useRoutes(routes){
    const path = window.location.pathname
    // console.log(routes)
    return routes.map((route)=>{
        // const match = path === route.path || path === '/' + route.path
        const match = path.startsWith(route.path)
        //todo 实现子路由 outlet
        return match ? route.element:null
    })
}

export function useNavigate(){
    // 跳转逻辑
    //historyAPI
    const {navigator} = React.useContext(NavigationContext)
    return navigator.push
}