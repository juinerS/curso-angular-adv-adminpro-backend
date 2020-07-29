const fs = require('fs');

const User = require('../models/user');
const Medico = require('../models/medico');
const Hopital = require('../models/hospital');

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        // Borrar la imagen anterior
        fs.unlinkSync(path);
    }
};


const updateImage = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        // Cambiar imagen del Hospital
        case 'hospitals':
            const hopital = await Hopital.findById(id);
            if (!hopital) {
                console.log('No es un hopital por id');
                return false;
            }

            pathViejo = `./uploads/hopitals/${hopital.img}`;
            deleteImage(pathViejo);

            hopital.img = nombreArchivo;
            await hopital.save();
            return true;

            // Cambiar imagen del Medico
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un medico por id');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            deleteImage(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            // Cambiar imagen del Usuario
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                console.log('No es un user por id');
                return false;
            }

            pathViejo = `./uploads/users/${user.img}`;
            deleteImage(pathViejo);

            user.img = nombreArchivo;
            await user.save();
            return true;

        default:
            break;
    }


};

module.exports = {
    updateImage
};