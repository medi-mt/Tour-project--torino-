"use client"

import isValidIranianNationalCode from "../../../components/core/utils/validationNationalCode"
import DatePicker from "react-multi-date-picker"
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import styles from "./Basket.module.css"
import { useSendDetalUser } from "../../core/services/mutations"
import { useGetBasket } from "../../../components/core/services/query"
import { useState } from "react"


function Basket() {

    const [inputsValue, setInputsValue] = useState({
        nationalCode: "",
        fullName: "",
        gender: "",
        birthDate: "",
    })
    const [birthDate, setBirthDate] = useState("")
    const [error, setError] = useState({
        fullNameErr: "",
        nationalCodeErr: "",
        birthDateErr: "",
        genderErr: ""
    })

    const { data } = useGetBasket()
    const { mutate } = useSendDetalUser()


    const changeHandler = (e) => {
        const { name, value } = e.target
        setInputsValue({ ...inputsValue, [name]: value })
    }
    const dateHandler = (date) => {
        setBirthDate(date);
        const gregorianDate = new DateObject(date).convert(persian, "gregorian").format("YYYY-MM-DD");
        setInputsValue({ ...inputsValue, birthDate: gregorianDate });
    };

    const submitHandler = () => {

        const newError = { fullNameErr: "", nationalCodeErr: "" };
        let isValid = true;

        if (!inputsValue.fullName.trim()) {
            newError.fullNameErr = "نام و نام خانوادگی الزامی است.";
            isValid = false;
        } else if (inputsValue.fullName.trim().length < 3) {
            newError.fullNameErr = "نام باید حداقل ۳ کاراکتر باشد.";
            isValid = false;
        }

        if (!inputsValue.nationalCode.trim()) {
            newError.nationalCodeErr = "کد ملی الزامی است.";
            isValid = false;
        } else if (!isValidIranianNationalCode(inputsValue.nationalCode.trim())) {
            console.log(!isValidIranianNationalCode(inputsValue.nationalCode.trim()))
            newError.nationalCodeErr = "کد ملی وارد شده معتبر نیست.";
            isValid = false;
        }


        if (!inputsValue.gender || inputsValue.gender === "gender") {
            newError.genderErr = "انتخاب جنسیت الزامی است.";
            isValid = false;
        }


        if (!inputsValue.birthDate) {
            newError.birthDateErr = "تاریخ تولد الزامی است.";
            isValid = false;
        }

        setError(newError)

        if (!isValid) return

        mutate(inputsValue, {
            onSuccess: (data) => console.log(data),
            onError: (error) => console.log(error)
        })

    }



    return (
        <div className={styles.wrapper_basket}>

            <div className={styles.detail_basket}>
                <div className={styles.top_section}>
                    <div className={styles.detail_user}>
                        <img src="/icon/user-profile.svg" className={styles.icon} />
                        <h3 className={styles.title}>مشخصات مسافر</h3>
                    </div>

                    <div className={styles.inputs}>
                        <input onChange={changeHandler} name="fullName" className={styles.input_name} type="text" placeholder="نام و نام خانوادگی" />
                        {error && (<p className={styles.err}>{error?.fullNameErr}</p>)}
                        <div className={styles.selectBox}>
                            <select onChange={changeHandler} name="gender" className={styles.select}>
                                <option value="gender" disabled selected>
                                    جنسیت
                                </option>
                                <option value="male">مرد</option>
                                <option value="female">زن</option>
                                <option value="other">سایر</option>
                            </select>
                        </div>
                        {error && (<p className={styles.err}>{error?.genderErr}</p>)}
                        <input onChange={changeHandler} name="nationalCode" className={styles.input_national_code} type="text" placeholder=" کد ملی" />
                        {error && (<p className={styles.err}>{error?.nationalCodeErr}</p>)}
                        <DatePicker
                            value={birthDate}
                            onChange={dateHandler}
                            calendar={persian}
                            locale={persian_fa}
                            minDate="1320/01/01"
                            maxDate="1404/12/29"
                            placeholder="تاریخ تولد"
                            inputClass={styles.input}
                        />

                        {error && (<p className={styles.err}>{error?.birthDateErr}</p>)}

                    </div>


                </div>

                <div className={styles.bottom_section}>
                    <div className={styles.information_tour}>
                        <span className={styles.information_tour_title}>
                            <h2>{data?.title}</h2>
                            <p> {Math.ceil(
                                (new Date(data?.endDate) - new Date(data?.startDate)) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                                روزه</p>
                        </span>
                        <span className={styles.price_section}>
                            <h5>قیمت نهایی</h5>
                            <span className={styles.price}>
                                <span>{data?.price}</span>
                                <p>تومان</p>
                            </span>

                        </span>
                        <button onClick={submitHandler} className={styles.btn}> ثبت و خرید نهایی </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Basket



