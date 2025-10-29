import styles from "./OtpModal.module.css"

function OtpModal({ children, showModalOtp, setShowModalOtp, setStep }) {

    if (!showModalOtp) return
    const modalHandler = () => {
        setShowModalOtp(false)
        setStep(1)
    }
    return (
        <div className={styles.backdrop} >
            <div className={styles.modal} >
                <button onClick={modalHandler} className={styles.closeBtn} >
                    ✕
                </button>
                {children}
            </div>
        </div>
    )
}

export default OtpModal