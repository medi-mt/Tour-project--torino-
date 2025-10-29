import Transactions from "../../components/template/transactions/Transactions"
import ProfilePage from '../../components/template/profilePage/ProfilePage'

function index() {
    return (
        <ProfilePage>
            <Transactions />
        </ProfilePage>
    )
}

export default index