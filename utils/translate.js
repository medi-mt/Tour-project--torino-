const translateVehicle = (vehicle) => {
    const value = {
        bus: "اتوبوس",
        airplane: "هواپیما",
        train: "قطار",
        ship: "کشتی",
        suv: "خودرو های آفرود"
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
    }
    return value[city] || city
}


export { translateCity, translateVehicle }
