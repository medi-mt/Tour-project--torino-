import AuthorizationProvider from "../../components/provider/AuthorizationProvider"
import ProfileDetail from "../../components/template/profileDetail/ProfileDetail"
import ProfilePage from "../../components/template/profilePage/ProfilePage"
function index() {
    return (
        <AuthorizationProvider>
            <ProfilePage>
                <ProfileDetail />
            </ProfilePage>
        </AuthorizationProvider>
    )
}

export default index