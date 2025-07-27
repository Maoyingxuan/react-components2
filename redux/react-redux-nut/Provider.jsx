import { Context } from "."
// 2.Provider传递value
export function Provider({store,children}){
    return <Context.Provider value={store}>{children}</Context.Provider>
}
// 3.后代消费value