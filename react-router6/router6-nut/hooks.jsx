import React from "react"
import { NavigationContext, RouterContext } from "./Context"
import {matchRoutes} from "react-router-dom"

export function useRoutes(routes){
    const location = useLocation()
    console.log(location)
    const pathname = location.pathname
    const matches = matchRoutes(routes,{pathname})
    // console.log(matches)
    return renderMatches(matches)
}

function renderMatches(matches){
    if(matches == null){
        return null
    }
    return matches.reduceRight((outlet,match)=>{
        return( 
        <RouterContext.Provider
            value={{outlet,matches}} 
            children={match.route.element || outlet}
            >
        </RouterContext.Provider>)
    },null)
}

export function useNavigate(){
    //跳转
    const { navigator } = React.useContext(NavigationContext);
    const navigate = React.useCallback(
        (to, options = {}) => {
          if (typeof to === "number") {
            navigator.go(to);
            return;
          }
          // eslint-disable-next-line no-extra-boolean-cast
          (!!options.replace ? navigator.replace : navigator.push)(
            to,
            options.state
          );
        },
        [navigator]
      );
    
      return navigate;
}

export function useLocation(){
    const {location} = React.useContext(NavigationContext)
    return location
}

export function useOutlet(){
    let {outlet} = React.useContext(RouterContext)
    return outlet
}

export function useParams(){
    const {matches} = React.useContext(RouterContext)
    const routeMatch = matches[matches.length - 1]
    return routeMatch? routeMatch.params : {}
}