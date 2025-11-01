
 function isValidIranianNationalCode(input) {
    if (!/^\d{10}$/.test(input)) return false; 
    
    const check = +input[9];
    const sum = input
    .split("")
    .slice(0, 9)
    .reduce((acc, cur, i) => acc + +cur * (10 - i), 0) % 11;
    
    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
}
export default isValidIranianNationalCode
