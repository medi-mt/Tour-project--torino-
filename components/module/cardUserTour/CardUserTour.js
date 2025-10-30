
import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/formatDate"
import { translateVehicle, translateCity } from "../../../utils/translate"
import styles from "./CardUserTour.module.css";

function CardUserTour({
    id,
    title,
    origin: { name: originName },
    destination: { name: destinationName },
    startDate,
    endDate,
    price,
    fleetVehicle,
}) {


    const [status, setStatus] = useState("");

    useEffect(() => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) {
            setStatus("شروع نشده");
        } else if (now >= start && now <= end) {
            setStatus("در حال برگزاری");
        } else {
            setStatus("به اتمام رسیده");
        }
    }, [startDate, endDate]);

    const statusClass = status === "در حال برگزاری" ? styles.active : status === "به اتمام رسیده" ? styles.finished : styles.pending;


    return (
        <div className={styles.wrapper}>

            <div className={styles.box}>
                <div className={styles.top_section}>
                    {status && (
                        <span className={`${styles.status_tour} ${statusClass}`}>
                            {status}
                        </span>
                    )}

                    <div className={styles.wrapper_title}>
                        <div className={styles.title}>
                            <img src="/icon/sun-fog.svg" alt="tour" />
                            <p>{title}</p>
                        </div>

                        <div className={styles.vehicle}>
                            <img src={`/icon/${fleetVehicle}.svg`} alt={fleetVehicle} />
                            <p>
                                {`سفر با ${translateVehicle(fleetVehicle)}`}
                            </p>
                        </div>
                    </div>

                    <div className={styles.wrapper_destination}>
                        <p className={styles.destination}>
                            {translateCity(originName)} به {translateCity(destinationName)}
                        </p>
                        <p className={styles.start_date}>.{formatDate(startDate)}</p>
                    </div>

                    <div className={styles.end_date_wrapper}>
                        <p className={styles.end_date}>تاریخ برگشت</p>
                        <p>.{formatDate(endDate)}</p>
                    </div>
                </div>

                <div className={styles.bottom_section}>
                    <div className={styles.number_tour}>
                        <p>شماره تور</p>
                        <span>{id.slice(0, 8)}</span>
                    </div>

                    <div className={styles.wrapper_price}>
                        <p>مبلغ پرداخت شده</p>
                        <div className={styles.price}>
                            <p className={styles.price_number}>
                                {price.toLocaleString("fa-IR")}
                            </p>
                            <span className={styles.toman}>تومان</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardUserTour;
