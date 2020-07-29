const { response } = require("express");

const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('user', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos: medicos
    });

};
const createMedicos = async(req, res = response) => {


    const uid = req.uid;
    const medico = new Medico({
        user: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Algo salio mal. Hable con el administrador'
        });

    }

};

const updateMedicos = (req, res = response) => {

    res.json({
        ok: true,
        msj: 'Todo esta bien en médicos: Actualizar'
    });

};

const deleteMedicos = (req, res = response) => {

    res.json({
        ok: true,
        msj: 'Todo esta bien en médicos: Eliminar'
    });

};


module.exports = {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos
};