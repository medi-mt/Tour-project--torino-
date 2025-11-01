import { useEffect } from 'react'
import { useRouter } from "next/router"
import { useProfile } from '../../components/core/services/query'

function AuthorizationProvider({ children }) {

    const router = useRouter()
    const { data, isLoading } = useProfile()


    useEffect(() => {
        if (!isLoading && !data) router.push("/")

    }, [data, isLoading])

    if (data) return (<div>{children}</div>)
}

export default AuthorizationProvider