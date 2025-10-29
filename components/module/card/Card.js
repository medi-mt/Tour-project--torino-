
import Image from 'next/image';
import Link from 'next/link';
import styles from "./Card.module.css"

function Card({ id,  title, image, price, }) {

    return (
  


            <div className={styles.wrapper_all} >
                <div className={styles.wrapper_tour}>
                    <Image
                        className={styles.img}
                        src={image}
                        alt={title}
                        width={327}
                        height={159}
                        loading="lazy"
                        quality={100}
                    />
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.date}>مهر ماه . 3 روزه - پرواز - هتل 3 س...</p>
                    <div className={styles.reservation}>
                        <Link href={`/tour/${id}`}>
                            <button className={styles.btn}>رزرو</button>
                        </Link>
                        <div className={styles.wrappe_price}>
                            <span className={styles.price} >{price}</span>
                            <p>تومان</p>
                        </div>
                    </div>
                </div>
            </div>
       
    )
}

export default Card