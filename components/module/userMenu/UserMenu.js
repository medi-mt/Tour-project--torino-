import { useState } from "react"
import Link from 'next/link';
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { setCookie } from "../../core/utils/cookie"
import { useRouter } from "next/router"
import { useProfile } from "../../core/services/query"
import styles from "./UserMenu.module.css"

function UserMenu() {


    const [showDropdown, setShowDropdown] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient();
    const { data } = useProfile()

    const logoutHandler = () => {

        setCookie("accessToken", "", 0);
        setCookie("refreshToken", "", 0);
        queryClient.removeQueries(["user-data"])
        setShowDropdown(false);
        toast.success(" با موفقیت از حساب کاربری خود خارج شدید");
        router.push("/")

    }

    return (
        <div className={styles.container}>
            <button onClick={() => setShowDropdown(!showDropdown)} className={styles.userButton}>
                <img className={showDropdown ? styles.arrowOpen : styles.arrow} src="/icon/arrow.svg" />
                <span className={styles.phone}>{data?.mobile}</span>
                <img src="/icon/user.svg" alt="user" className={styles.icon} />
            </button>

            {showDropdown && (<div className={styles.dropdown}>
                <div className={styles.userInfo}>
                    <button className={styles.settingsBtn}>
                        <img src="/icon/profile2.svg" alt="settings" />
                    </button>
                    <span className={styles.userNumber}>{data?.mobile}</span>

                </div>

                <div className={styles.menuList}>
                    <Link href="/profile">
                        <button onClick={() => setShowDropdown(false)} className={styles.menuItem}>
                            <img src="/icon/user-profile.svg" alt="profile" />
                            اطلاعات حساب کاربری
                        </button>
                    </Link>

                    <button onClick={logoutHandler} className={`${styles.menuItem} ${styles.logout}`}>
                        <img src="/icon/logout.svg" alt="logout" />
                        خروج از حساب کاربری
                    </button>
                </div>
            </div>)}
        </div>
    )
}

export default UserMenu