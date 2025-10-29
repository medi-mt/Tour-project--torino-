import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router'
import { useSendTourBasket } from "../../../services/mutations";
import { formatDate } from "../../../utils/formatDate";
import { translateVehicle, translateCity } from "../../../utils/translate";
import styles from "./DetailTour.module.css";

function DetailTour({ tours }) {
    const {
        id,
        origin,
        startDate,
        endDate,
        title,
        image,
        price,
        capacity,
        fleetVehicle,
        insurance,

    } = tours;

    const router = useRouter()
    const { mutate, isPending } = useSendTourBasket()

    const handleCheckOut = () => {

        if (isPending) return

        mutate(id, {
            onSuccess: (data) => {
                toast.success(data.data.message)
                router.push("/checkout")
                console.log(data);
            },
            onError: (error) => {
                if (error.response?.status == 401) {

                    toast.error("!وارد سایت شوید")
                }
            }
        });
    }



    return (
        <div className={styles.container_tour}>
            <div className={styles.wrapper_tour}>
                <div className={styles.detail_tour}>
                    <div className={styles.wrapper_img}>
                        <img className={styles.img_tour} src={image} alt={title} />
                    </div>

                    <div className={styles.left_detail}>
                        <span className={styles.title_tour}>
                            <h2>{title}</h2>
                            <p>
                                {Math.ceil(
                                    (new Date(endDate) - new Date(startDate)) /
                                    (1000 * 60 * 60 * 24)
                                )}{" "}
                                روزه
                            </p>
                        </span>

                        <div className={styles.info}>
                            <span className={styles.info_item}>
                                <img src="/icon/user-tick.svg" alt="leader" />
                                <p>تورلیدر از مبدا</p>
                            </span>
                            <span className={styles.info_item}>
                                <img src="/icon/map.svg" alt="map" />
                                <p>برنامه سفر</p>
                            </span>
                            <span className={styles.info_item}>
                                <img src="/icon/medal-star.svg" alt="quality" />
                                <p>تضمین کیفیت</p>
                            </span>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.details_mobile}>
                                <span className={styles.detail_item}>
                                    <div className={styles.detail_item_label}>
                                        <img src="/icon/bus.svg" alt="bus" />
                                        <p>حمل و نقل</p>
                                    </div>
                                    <p className={styles.detail_item_text}>
                                        {translateVehicle(fleetVehicle)}
                                    </p>
                                </span>

                                <span className={styles.detail_item}>
                                    <div className={styles.detail_item_label}>
                                        <img src="/icon/profile-2user.svg" alt="capacity" />
                                        <p>ظرفیت</p>
                                    </div>
                                    <p className={styles.detail_item_text}>
                                        {capacity} نفر
                                    </p>
                                </span>

                                <span className={styles.detail_item}>
                                    <div className={styles.detail_item_label}>
                                        <img src="/icon/security.svg" alt="insurance" />
                                        <p>بیمه</p>
                                    </div>
                                    <p className={styles.detail_item_text}>
                                        {insurance ? "دارد" : "ندارد"}
                                    </p>
                                </span>
                            </div>
                        </div>

                        <div className={styles.price_section}>

                            <button onClick={handleCheckOut} className={styles.btn}>رزرو و خرید</button>

                            <span>
                                <p className={styles.price}>
                                    {price.toLocaleString("fa-IR")}
                                </p>
                                <p>تومان</p>
                            </span>
                        </div>
                    </div>
                </div>

            
                <div className={styles.detail_tour_desktop}>
                    <div className={styles.item}>
                        <div className={styles.header}>
                            <img src="/icon/routing-2.svg" className={styles.icon} alt="origin" />
                            <p className={styles.title}>مبدا</p>
                        </div>
                        <p className={styles.value}>{translateCity(origin?.name)}</p>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.header}>
                            <img src="/icon/calendar.svg" className={styles.icon} alt="startDate" />
                            <p className={styles.title}>تاریخ رفت</p>
                        </div>
                        <p className={styles.value}>{formatDate(startDate)}</p>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.header}>
                            <img src="/icon/calendar.svg" className={styles.icon} alt="endDate" />
                            <p className={styles.title}>تاریخ برگشت</p>
                        </div>
                        <p className={styles.value}>{formatDate(endDate)}</p>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.header}>
                            <img src="/icon/bus.svg" className={styles.icon} alt="vehicle" />
                            <p className={styles.title}>حمل و نقل</p>
                        </div>
                        <p className={styles.value}>{translateVehicle(fleetVehicle)}</p>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.header}>
                            <img src="/icon/profile-2user.svg" className={styles.icon} alt="capacity" />
                            <p className={styles.title}>ظرفیت</p>
                        </div>
                        <p className={styles.value}>{capacity} نفر</p>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.header}>
                            <img src="/icon/security.svg" className={styles.icon} alt="insurance" />
                            <p className={styles.title}>بیمه</p>
                        </div>
                        <p className={styles.value}>{insurance ? "دارد" : "ندارد"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailTour;
