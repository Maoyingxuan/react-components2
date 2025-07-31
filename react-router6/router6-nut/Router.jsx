import {NavigationContext} from "./Context"
import React from "react"
export default function Router({navigator,children,location}){
    const navigationContext = React.useMemo(()=>{
        return {navigator, location}
    },[navigator,location]) 
    return (
        <NavigationContext.Provider value = {navigationContext}>
            {children}
        </NavigationContext.Provider>
    )
}