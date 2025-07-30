import { useNavigate } from "./hooks"
export default function Link({to,children}){
    // console.log('1')
    const navigate = useNavigate()
    const handle = (e) => {
        e.preventDefault()
        navigate(to)
    }
    return (
        <a href={to} onClick={handle}>{children}</a>
    )
}