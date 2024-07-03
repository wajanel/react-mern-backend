const moment = require('moment');


const isDateValid = (value) =>{
    if ( !value )
        return false;

    const fecha = moment(value);
    return fecha.isValid();
}


module.exports = {
    isDateValid
}