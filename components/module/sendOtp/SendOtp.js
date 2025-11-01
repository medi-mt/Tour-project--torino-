
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import ValidationPhoneNumber from '../../core/utils/ValidationPhoneNumber'
import { useSendOtp } from '../../core/services/mutations'
import styles from "./SendOtp.module.css"

function SendOtp({ mobile, setMobile, setStep }) {

    const [err, setErr] = useState("")
    const { mutate, data } = useSendOtp()


    const SendOtpHandler = () => {

        if (!mobile) {
            setErr("لطفا شماره موبایل خود را وارد کنید ")

        } else if (!ValidationPhoneNumber(mobile)) {
            setErr("شماره وارد شده اشتباه می باشد")

        } else {
            mutate({
                mobile,
            },

                {
                    onSuccess: (data) => {
                        toast.success("کد تایید با موفقیت ارسال شد ")
                        toast(`کد تایید : ${data?.code}`, { duration: 10000 })
                        setStep(2)
                    }

                })
            setErr("")

        }

    }

    return (
        <>
            <h2 className={styles.title}>
                ورود به تورینو
            </h2>
            <div className={styles.wrapper_input}>
                <label className={styles.label}>شماره موبایل خود را وارد کنید </label>
                <input onChange={(e) => setMobile(e.target.value)} placeholder="4253***0912" />
                {
                    !!err && <span className={styles.err}>{err}</span>
                }
            </div>
            <button
                // disabled={err ? true : false}
                onClick={SendOtpHandler} className={styles.sendBtn}> ارسال کد تایید</button>
        </>

    )
}

export default SendOtp