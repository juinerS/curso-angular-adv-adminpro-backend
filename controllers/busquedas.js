const { response } = require('express');

const User = require('../models/user');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

// ================================
//     Buscar
// ================================
const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [users, medicos, hopitals] = await Promise.all([
        User.find({ name: regex }),
        Medico.find({ name: regex }),
        Hospital.find({ name: regex }),
    ]);

    res.json({
        ok: true,
        users,
        medicos,
        hopitals
    });
};

// ================================
//     Buscar en una colección específica
// ================================
const getDocumentColection = async(req, res = response) => {

    const table = req.params.table;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (table) {
        case 'medicos':
            data = await Medico.find({ name: regex })
                .populate('user', 'name img')
                .populate('hospital', 'name img');
            break;
        case 'hospitals':
            data = await Hospital.find({ name: regex }).populate('user', 'name img');
            break;
        case 'users':
            data = await User.find({ name: regex });
            break;

        default:
            return res.status(400).json({
                ok: true,
                msg: 'La tabla no fue encontrada'
            });
    }

    res.json({
        ok: true,
        respuesta: data
    });
};

// Exportaciones
module.exports = {
    getTodo,
    getDocumentColection
};