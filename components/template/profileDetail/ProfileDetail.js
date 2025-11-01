import isValidIranianNationalCode from "../../core/utils/validationNationalCode"
import DatePicker from "react-multi-date-picker"
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaBank, schemaEmail } from "../../../schema/schema";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEditUserProfile } from "../../core/services/mutations"
import styles from "./ProfileDetail.module.css"
import { useProfile } from "../../core/services/query";
import t from "react-date-object/locales/persian_fa";


function ProfileDetail() {


    const [inputsValue, setInputsValue] = useState({
        nationalCode: "",
        fullName: "",
        gender: "",
        birthDate: "",
    })
    const [error, setError] = useState({
        fullNameErr: "",
        nationalCodeErr: "",
    })
    const [birthDate, setBirthDate] = useState("")
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditPersonalInfo, setIsEditPersonalInfo] = useState(false)
    const [isEditBankInfo, setIsEditBankInfo] = useState(false)

    const { mutate } = useEditUserProfile()
    const { data } = useProfile()


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schemaEmail) })

    const {
        register: registerBank,
        handleSubmit: handleBankSubmit,
        formState: { errors: bankErrors },
    } = useForm({ resolver: yupResolver(schemaBank) })


    const changeHandler = (e) => {
        const { name, value } = e.target
        setInputsValue({ ...inputsValue, [name]: value })
    }
    const dateHandler = (date) => {
        setBirthDate(date);
        const gregorianDate = new DateObject(date).convert(persian, "gregorian").format("YYYY-MM-DD");
        setInputsValue({ ...inputsValue, birthDate: gregorianDate });
    };

    const editPrInfoUser = () => {

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
        setIsEditPersonalInfo(false)
        mutate(inputsValue,
            {
                onSuccess: data => toast.success(data.message),
                onError: error => toast.error(error.message || "مشکلی پیش امده")
            }
        )
    }


    const emailSubmit = (data) => {
        mutate(data, {
            onSuccess: data => {
                toast.success(data?.message)
                setIsEditingEmail(false)
            },
            onError: error => toast.error(error.message || "مشکلی پیش امده")
        })
    }

    const sendBankIbfo = (data) => {
        mutate({ payment: data },
            {
                onSuccess: (data) => {
                    toast.success(data?.message)
                    setIsEditBankInfo(false)
                },
                onError: (error) => toast.error(error?.message || "مشکلی پیش امده ")
            }
        )
    }

    return (
        <div className={styles.wrapper_detail_profile}>
            <div className={styles.user_info}>

                <h4>اطلاعات حساب کاربری </h4>
                <span className={styles.mobile}>
                    <p>شماره موبایل </p>
                    <i>{data?.mobile}</i>
                </span>
                <div className={
                    isEditingEmail ? styles.email_edit_mode : styles.email
                }>
                    {isEditingEmail ?
                        (<form onSubmit={handleSubmit(emailSubmit)} className={styles.edit_email}>
                            <div>
                                <input {...register("email")} type="email" placeholder="ایمیل خود را وارد کنید" />
                                <button type="submit">تایید</button>
                            </div>
                            {errors?.email?.message && (<p className={styles.err}>{errors?.email?.message}</p>)}
                        </form>)
                        :
                        (
                            <>
                                <span>ایمیل</span>
                                <p>{data?.email || "_"}</p>
                                <span onClick={() => setIsEditingEmail(true)} className={styles.add_email}>
                                    <img src="/icon/edit.svg" />
                                    <p>افزودن</p>
                                </span>
                            </>
                        )}

                </div>


            </div>

            <>
                {
                    isEditPersonalInfo ? (
                        <div className={styles.edit_pr_info}>
                            <h4 className={styles.title}>ویرایش اطلاعات شخصی</h4>
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
                            </div>
                            <div className={styles.btns}>
                                <button onClick={editPrInfoUser} className={styles.confirm}>تایید</button>
                                <button onClick={() => setIsEditPersonalInfo(false)} className={styles.cancel}>انصراف</button>
                            </div>
                        </div>)
                        : (<div className={styles.Personal_information}>
                            <div className={styles.title}>
                                <p>اطلاعات شخصی</p>
                                <span onClick={() => setIsEditPersonalInfo(true)} className={styles.add_information}>
                                    <img src="/icon/edit.svg" />
                                    <p>
                                        ویرایش اطلاعات
                                    </p>
                                </span>
                            </div>
                            <div className={styles.full_name}>
                                <p>  نام و نام خانوادگی</p>
                                <span>{data?.fullName || "_"}</span>
                            </div>
                            <div className={styles.national_code}>
                                <p>کد ملی</p>
                                <span>{data?.nationalCode || "_"}</span>
                            </div>
                            <div className={styles.gender}>
                                <p>جنسیت</p>
                                <span>{data?.gender || "_"}</span>
                            </div>
                            <div className={styles.birthDate}>
                                <p>تاریخ تولد</p>
                                <span>{data?.birthDate || "_"}</span>
                            </div>
                        </div>)
                }
            </>

            <>
                {
                    isEditBankInfo ? (
                        <div className={styles.wrapper_edit_bank}>
                            <h4>ویرایش اطلاعات بانکی</h4>
                            <form onSubmit={handleBankSubmit(sendBankIbfo)} className={styles.inputs_bank}>
                                <input {...registerBank("debitCard_code")} className={styles.edit_input_bank} placeholder="شماره کارت" />
                                {bankErrors?.debitCard_code?.message && (<p className={styles.err}>{bankErrors?.debitCard_code?.message}</p>)}
                                <input {...registerBank("accountIdentifier")} className={styles.edit_input_bank} placeholder="شماره حساب" />
                                {bankErrors?.accountIdentifier?.message && (<p className={styles.err}>{bankErrors?.accountIdentifier?.message}</p>)}
                                <input  {...registerBank("shaba_code")} className={styles.edit_input_bank} placeholder="شماره شبا (IR...)" />
                                {bankErrors?.shaba_code?.message && (<p className={styles.err}>{bankErrors?.shaba_code?.message}</p>)}

                                <div className={styles.btns}>
                                    <button type="submit" className={styles.confirm}>تایید</button>
                                    <button type="button" onClick={() => setIsEditBankInfo(false)} className={styles.cancel}>انصراف</button>
                                </div>
                            </form>

                        </div>

                    ) : (<div className={styles.bank_info}>
                        <div className={styles.title_bank}>
                            <p>اطلاعات حساب بانکی</p>
                            <span onClick={() => setIsEditBankInfo(true)} className={styles.add_info_bank}>
                                <img src="/icon/edit.svg" />
                                <p>
                                    ویرایش اطلاعات
                                </p>
                            </span>
                        </div>
                        <div className={styles.card_number}>
                            <p>شماره کارت</p>
                            <sapn>{data?.payment?.debitCard_code || "_"}</sapn>
                        </div>
                        <div className={styles.card_number}>
                            <p>شماره شبا</p>
                            <sapn>{data?.payment?.shaba_code || "_"}</sapn>
                        </div>
                        <div className={styles.card_number}>
                            <p>شماره حساب</p>
                            <sapn>{data?.payment?.accountIdentifier || "_"}</sapn>
                        </div>

                    </div>)
                }
            </>
        </div>
    )
}

export default ProfileDetail
