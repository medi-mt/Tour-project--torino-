
const ValidationPhoneNumber = (phone) => new RegExp("^[0][9][0-9][0-9]{8,8}$").test(phone)

export default ValidationPhoneNumber