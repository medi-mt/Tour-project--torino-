"use client"
import AuthorizationProvider from "../../components/provider/AuthorizationProvider"
import Basket from "../../components/template/basket/Basket"

function index() {
    return (
        <div>
            <AuthorizationProvider>
                <Basket />
            </AuthorizationProvider>
        </div>
    )
}

export default index

