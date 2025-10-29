import Card from "../../module/card/Card"
import Link from "next/link";
import styles from "./Tours.module.css"
import { FaArrowLeftLong } from "react-icons/fa6";

function Tours({ toursData }) {
    console.log(toursData);
    return (
        <>
            <div className={styles.title}>
                <Link href="/">
                    <span>تورینو</span>
                </Link>


                <p>
                    برگزار کننده بهترین تور های داخلی
                </p>
            </div>
            <div className={styles.container_tours}>
                {toursData.length === 0 && (
                    <div className={styles.notFound_tour}>
                        <p>تور مورد نظر یافت نشد </p>
                        <Link href="/">
                            <FaArrowLeftLong />
                        </Link>
                    </div>
                )}

                {toursData.map(tour => {
                    return <Card key={tour.id} {...tour} />
                })}

            </div>
        </>
    )
}

export default Tours


