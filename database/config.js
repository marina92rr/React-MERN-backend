
const mongoose = require('mongoose');       //importar BBDD MongoDB

const dbConnection = async () =>{

    try {
        await mongoose.connect(process.env.DB_CNN, {

        });
        console.log('DB Online');

    } catch (error) {
        console.log('Error:', error.message);
        console.log('Detalles:', error);
        throw new Error("Error a la hora de inicializar BD");
    }
}

module.exports ={
    dbConnection
}