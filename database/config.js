const mongoose = require('mongoose');


const ConoectionDB = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Database Online')
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la Base de Datos');
    }


};

module.exports = {
    ConoectionDB
}