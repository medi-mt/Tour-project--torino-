"use client"

import { useGetUserTour } from "../../../services/query"
import CardUserTour from "../../module/cardUserTour/CardUserTour"

function MyTour() {
    const { data, isPending } = useGetUserTour()

    if (isPending) return (<p>درحال بارگزاری...</p>)
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