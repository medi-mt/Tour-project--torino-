import { useEffect, useState } from 'react'

function Timer({setShowModalOtp}) {

    const [secondsLeft, setSecondsLeft] = useState(120)

    useEffect(() => {

        if (secondsLeft <= 0) return setShowModalOtp(false)

        const interVal = setInterval(() => {
            setSecondsLeft(seconds => seconds - 1)
        }, 1000)

        return () => clearInterval(interVal)

    }, [secondsLeft])

    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const seconds = String(secondsLeft % 60).padStart(2, "0");

    return (

        <div>  {`${minutes}:${seconds}  | زمان باقی مانده `}</div>
    )
}

export default Timer