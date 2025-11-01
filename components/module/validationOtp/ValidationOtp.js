import { useState } from "react";
import InputOTP from "react18-input-otp";
import { useValidateOtp } from "../../core/services/mutations";
import Timer from "../timer/Timer";
import toast from "react-hot-toast";
import { setCookie } from "../../core/utils/cookie";
import styles from "./ValidationOtp.module.css"


function ValidationOtp({ mobile, setMobile, setStep, setShowModalOtp }) {

    const [code, setCode] = useState("");
    const { mutate } = useValidateOtp();


    const handleChange = (value) => {
        setCode(value);
    };

    const onSuccess = (data) => {
        setCookie("accessToken", data.accessToken, 30);
        setCookie("refreshToken", data.refreshToken, 365);
        toast.success("ورود با موفقیت انجام شد ")
        setShowModalOtp(false);
        setStep(1)
    }

    const sendCodeHandler = () => {
        mutate({ mobile, code }, { onSuccess });
    }

    const handelBack = () => {
        setMobile("")
        setStep(1)
    }


    return (
        <div className={styles.wrapper_inputOtp}>
            <img onClick={handelBack} className={styles.line_arrow} src="/icon/Line arrow-left.svg" />
            <h2 className={styles.title}> کد تایید را وارد کنید </h2>
            <h3 className={styles.text}>کد تایید به شماره {mobile}ارسال شد</h3>
            <div className={styles.wrapper_inputOtp}>

                <InputOTP
                    value={code}
                    onChange={handleChange}
                    numInputs={6}
                    inputStyle={{
                        width: "3.5rem",
                        height: "3.5rem",
                        margin: "0 0.4rem",
                        fontSize: "1.5rem",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        textAlign: "center",
                        direction: "ltr",
                    }}
                    focusStyle={{
                        borderColor: "#00a859",
                        outline: "none",
                    }}
                />
            </div>
            <Timer setShowModalOtp={setShowModalOtp} />

            <button onClick={sendCodeHandler} className={styles.send_Otp_Btn}>ورود به تورینو</button>
        </div>
    )
}

export default ValidationOtp