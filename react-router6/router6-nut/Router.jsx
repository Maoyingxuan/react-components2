import {NavigationContext} from "./Context"
import React from "react"
export default function Router({navigator,children}){
    const navigationContext = React.useMemo(()=>{
        return {navigator}
    },[navigator]) 
    return (
        <NavigationContext.Provider value = {navigationContext}>
            {children}
        </NavigationContext.Provider>
    )
}