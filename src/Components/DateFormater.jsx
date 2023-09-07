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

export const AgeCalculator = (BirthDate) =>{
  if(BirthDate){
    const birthdateObj = new Date(BirthDate);
      const currentDate = new Date();

      const ageInMilliseconds = currentDate - birthdateObj;
      const ageInYears = Math.floor(ageInMilliseconds / (365 * 24 * 60 * 60 * 1000));

      return ageInYears;
  }else{
    console.log('Wrong Birthdate:',BirthDate);
    return null;
  }
}

export default DateFormater;