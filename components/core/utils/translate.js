const translateVehicle = (vehicle) => {
    const value = {
        bus: "اتوبوس",
        airplane: "هواپیما",
        train: "قطار",
        ship: "کشتی",
        SUV: "خودرو های آفرود"
    }

    return value[vehicle] || vehicle
}


const translateCity = (city) => {
    const value = {
        Tehran: "تهران",
        Sanandaj: "سنندج",
        Shiraz: "شیراز",
        Mashhad: "مشهد",
        Isfahan: "اصفهان",
        Tabriz: "تبریز",
        Hamedan: "همدان",
        Kermanshah: "کرمانشاه",
        Kurdestan: "کردستان",
        Sulaymaniyah: "سلیمانیه",
        Madrid: "مادرید",
        Hewler:"هولر",
        Mazandaran:"مازندران",
        Gilan:"گیلان",
        Italy:"ایتالیا",
        Sananndaj :"سنندج"
    }
    return value[city] || city
}


export { translateCity, translateVehicle }
