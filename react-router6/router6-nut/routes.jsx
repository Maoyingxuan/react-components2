import React from 'react'
import createRoutesFromChildren from './createRoutesFromChildren'
import {useRoutes} from "./hooks"
export default function Routes({children}) {
    const routes = createRoutesFromChildren(children)
    return useRoutes(routes)
}
//routes决定渲染谁
