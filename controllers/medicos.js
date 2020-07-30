const { response } = require("express");

const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('user', 'name img')
        .populate('hospital', 'name img');

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

const updateMedicos = async(req, res = response) => {

    const medicoID = req.params.id;
    const uid = req.uid;

    try {

        const medicoDB = await Medico.findById(medicoID);

        if (!medicoDB) {
            return res.status(404).json({
                ok: true,
                msj: 'No se encontro ningun Médico'
            });
        }

        // hospitalDB.name = req.body.name;
        const cambiosMedico = {
            ...req.body,
            user: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoID, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Algo salio mal. Por favor hable con el administrador'
        });
    }

};

const deleteMedicos = async(req, res = response) => {

    const medicoID = req.params.id;

    try {

        const medicoDB = await Medico.findById(medicoID);

        if (!medicoDB) {
            return res.status(404).json({
                ok: true,
                msj: 'No se encontro ningun Médico'
            });
        }

        await Medico.findOneAndDelete(medicoID);

        res.json({
            ok: true,
            msg: 'El Médico ha sido eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Algo salio mal. Por favor hable con el administrador'
        });
    }

};


module.exports = {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos
};