import React, { useEffect } from 'react'
import { useNavigate } from './hooks'
//本质是跳转，不返回任何东西
export default function Navigate({to,state,replace}) {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(to, { replace, state });
    });
    return null
}
