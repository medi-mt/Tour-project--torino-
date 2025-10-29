
import { useState } from "react"
import { Toaster } from 'react-hot-toast';
import MobileSlider from "../components/module/mobileSlider/MobileSlider"
import OtpBtn from "../components/module/otpBtn/OtpBtn"
import Link from "next/link"
import { useRouter } from "next/router"

import styles from "./Layout.module.css"


function Layout({ children }) {


    const [open, setOpen] = useState(false)
    return (
        <>
            <Toaster />
            <div>
                <MobileSlider open={open} setOpen={setOpen} />
                <Header open={open} setOpen={setOpen} />
                <div onClick={() => setOpen(false)} className={styles.container}>{children}</div>
                <Footer open={open} setOpen={setOpen} />

            </div>
        </>

    )
}

export default Layout


function Header({ open, setOpen }) {
    const router = useRouter()

    return (
        <header>
            <div className={styles.header_mobile}>
                <img onClick={() => setOpen(true)} className={styles.header_signin_icon} src="/icon/linemenu.svg" />
                <OtpBtn />
            </div>
            <div className={styles.header_desktop}>
                <nav className={styles.navbar}>
                    <img src="/icon/TorinoI.svg" />
                    <ul>
                        <Link href="/">
                            <li className={router.pathname === "/" ? styles.active : ""} >
                                صفحه اصلی
                            </li>
                        </Link>

                        <li>
                            خدمات گردشگری
                        </li>

                        <li>
                            درباره ما
                        </li>

                        <li>
                            تماس با ما
                        </li>
                    </ul>
                </nav>
                <OtpBtn />
            </div>
            <img className={styles.header_img} src="/image/header_img.png" />
        </header>

    )
}



function Footer({ open, setOpen }) {
    return (
        <footer onClick={() => setOpen(false)} className={styles.footer}>
            <div className={styles.footer_content}>
                <div className={styles.footer_top}>

                    <div className={styles.right_content}>
                        <h3>تورینو</h3>
                        <ul>
                            <li>
                                درباره ما
                            </li>
                            <li>
                                تماس با ما
                            </li>
                            <li>
                                چرا تورینو
                            </li>
                            <li>
                                بیمه مسافرتی
                            </li>
                        </ul>
                    </div>
                    <div className={styles.left_content}>
                        <h3>خدمات مشتریان</h3>
                        <ul>
                            <li>
                                پشتیبانی انلاین
                            </li>
                            <li>
                                راهنمای خرید
                            </li>
                            <li>
                                راهنمای استرداد
                            </li>
                            <li>
                                پرسش و پاسخ
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footrt_bottom}>
                    <div className={styles.footer_bot_right}>
                        <span>
                            <img src="/image/aira.jpg" />
                            <img src="/image/ecunion.jpg" />
                            <img src="/image/passenger-rights.jpg" />
                        </span>

                        <span>
                            <img src="/image/samandehi.jpg" />
                            <img src="/image/state-airline.jpg" />
                        </span>
                    </div>
                    <div className={styles.footer_bot_left}>
                        <span>
                            <img src="/icon/TorinoI.svg" />
                        </span>
                        <p>تلفن پشتیبانی :8574-021</p>
                    </div>
                </div>
            </div>
            <p className={styles.text_rule}>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</p>
        </footer>
    )
}