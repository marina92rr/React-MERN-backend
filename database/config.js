
const mongoose = require('mongoose');       //importar BBDD MongoDB

const dbConnection = () =>{

    try {
        mongoose.connect('mongodb+srv://mern_user:.pVRFNv7-63LH7A@calendardb.lhyrw9x.mongodb.net/mern_calendar');
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de inicializar BD");
        
    }
}

module.exports ={
    dbConnection
}