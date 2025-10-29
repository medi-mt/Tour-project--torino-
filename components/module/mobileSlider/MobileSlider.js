import { IoClose } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./MobileSlider.module.css"

function MobileSlider({ open, setOpen }) {

    const router = useRouter()

    return (
        <>
            <div className={open ? `${styles.open}` : `${styles.wrapper_slider}`}>
                <ul className={styles.content_slider}>
                    <Link href="/">
                        <li onClick={() =>setOpen(false)}>
                            <IoMdHome size={18} />
                            <span className={router.pathname === "/" ? styles.active : ""}>صفحه اصلی</span>
                        </li>
                    </Link>
                    <li>
                        <img src="/icon/airplane-square.svg" alt="flight" />
                        <span>خدمات گردشگری</span>
                    </li>
                    <li>
                        <img src="/icon/volume-low.svg" alt="sound" />
                        <span> درباره ما</span>
                    </li>
                    <li>
                        <img src="/icon/call.svg" alt="call" />
                        <span>تماس با ما</span>
                    </li>
                </ul>
                <IoClose onClick={() => setOpen(false)} size={25} className={styles.IoClose} />
            </div>
            {open && <div className={styles.overlay} onClick={() => setOpen(false)}></div>}

        </>
    )
}

export default MobileSlider