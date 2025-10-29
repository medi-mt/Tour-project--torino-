import styles from "./ServiceAdvantages.module.css"
function ServiceAdvantages() {
    return (
        <div className={styles.services_wrapper}>
            <div className={styles.service}>
                <img src="/icon/serviceImg1.svg" className={styles.service_icon} />
                <div>
                    <h5 className={styles.service_title}>بصرفه ترین قیمت </h5>
                    <p className={styles.service_text}>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
                </div>
            </div>
            <div className={styles.service}>
                <img src="/icon/serviceImg2.svg" className={styles.service_icon} />
                <div>
                    <h5 className={styles.service_title}>بصرفه ترین قیمت </h5>
                    <p className={styles.service_text}>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
                </div>
            </div>
            <div className={styles.service}>
                <img src="/icon/serviceImg3.svg" className={styles.service_icon} />
                <div>
                    <h5 className={styles.service_title}>بصرفه ترین قیمت </h5>
                    <p className={styles.service_text}>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
                </div>
            </div>
        </div>
    )
}

export default ServiceAdvantages