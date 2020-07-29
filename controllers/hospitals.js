const { response } = require("express");

const Hospital = require('../models/hospital');


const getHospitals = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('user', 'name');

    res.json({
        ok: true,
        hospitales
    });

};
const createHospitals = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Algo no esta bien. Habla con el administrador'
        });

    }

    res.json({
        ok: true,
        msj: 'Todo esta bien en hospitales: Crear'
    });

};

const updateHospitals = (req, res = response) => {

    res.json({
        ok: true,
        msj: 'Todo esta bien en hospitales: Actualizar'
    });

};

const deleteHospitals = (req, res = response) => {

    res.json({
        ok: true,
        msj: 'Todo esta bien en hospitales: Eliminar'
    });

};


module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
};