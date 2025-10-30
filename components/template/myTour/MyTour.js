"use client"
import { useGetUserTour } from "../../../services/query"
import CardUserTour from "../../module/cardUserTour/CardUserTour"
import styles from "./MyTour.module.css"

function MyTour() {

    const { data, isPending } = useGetUserTour()

    if (isPending) return (<p>درحال بارگزاری...</p>)

    if (!data?.title) return <p className={styles.notFound_tour}>در حال حاضر توری ندارید</p>
    return (
        <>
            {
                data?.map(tour => {
                    return <CardUserTour key={tour.id} {...tour} />
                })
            }
        </>
    )
}

export default MyTour