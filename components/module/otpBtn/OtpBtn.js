
import { useEffect, useState } from "react"
import SendOtp from "../sendOtp/SendOtp"
import ValidationOtp from "../validationOtp/ValidationOtp"
import OtpModal from "../../container/otpModal/OtpModal"
import styles from "./OtpBtn.module.css"
import { useProfile } from "../../../services/query"
import UserMenu from "../userMenu/UserMenu"


function OtpBtn() {

    const [width, setWidth] = useState(0)
    const [showModalOtp, setShowModalOtp] = useState(false)
    const [step, setStep] = useState(1)
    const [mobile, setMobile] = useState("")
  
    const { data } = useProfile()

    useEffect(() => {
        const handleSize = () => setWidth(window.innerWidth)
        handleSize()
        window.addEventListener("resize", handleSize)
        return () => window.removeEventListener("resize", handleSize)
    }, [])


    if (data) return (<UserMenu mobile={mobile}  />)


    return (

         
            <div>
                {width < 620 ? (<img onClick={() => setShowModalOtp(true)} className={styles.signin_mob} src="/icon/signInBtn.svg" />)
                    :
                    (<button onClick={() => setShowModalOtp(true)} className={styles.signin}>
                        <img src="/icon/profile.svg" />
                        <p> ورود | ثبت نام</p>
                    </button>)}

                {step === 1 && (
                    <OtpModal showModalOtp={showModalOtp} setShowModalOtp={setShowModalOtp} setStep={setStep} >
                        <SendOtp
                            mobile={mobile}
                            setMobile={setMobile}
                            setStep={setStep}
                        />
                    </OtpModal>
                )}
                {
                    step === 2 && (
                        <OtpModal showModalOtp={showModalOtp} setShowModalOtp={setShowModalOtp} setStep={setStep}>
                            <ValidationOtp
                                mobile={mobile} setMobile={setMobile}
                                setStep={setStep}
                                showModalOtp={showModalOtp} setShowModalOtp={setShowModalOtp}
                            />
                        </OtpModal>
                    )
                }
            </div>
        
    )
}

export default OtpBtn