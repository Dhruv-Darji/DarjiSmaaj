const DateFormater = (userDate) =>{
    const date = new Date(userDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      
      return `${day}/${monthNames[month]}/${year}`
}
export default DateFormater;