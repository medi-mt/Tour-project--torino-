
import * as yup from "yup";

const schemaEmail = yup.object({
    email: yup
        .string()
        .transform((v) => (typeof v === "string" ? v.trim().toLowerCase() : v))
        .required("ایمیل الزامی است")
        .email("فرمت ایمیل معتبر نیست")
        .max(24, "ایمیل نباید بیشتر از 24 کاراکتر باشد")
        .matches(/@gmail\.com$/i, "ایمیل باید با @gmail.com تمام شود"),
}).required();


const schemaBank = yup.object({
    debitCard_code: yup
        .string()
        .required("شماره کارت الزامی است")
        .matches(/^\d{16}$/, "شماره کارت باید ۱۶ رقم باشد"),

    accountIdentifier: yup
        .string()
        .required("شماره حساب الزامی است")
        .matches(/^\d{6,20}$/, "شماره حساب باید بین ۶ تا ۲۰ رقم باشد"),

    shaba_code: yup
        .string()
        .required("شماره شبا الزامی است")
        .matches(/^IR\d{24}$/, "شماره شبا باید با IR شروع شود و ۲۴ رقم داشته باشد"),
});

export { schemaEmail, schemaBank }