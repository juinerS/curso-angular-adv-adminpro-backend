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

const updateHospitals = async(req, res = response) => {

    const hospitalID = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById(hospitalID);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: true,
                msj: 'No se encontro ningun Hospital'
            });
        }

        // hospitalDB.name = req.body.name;
        const cambiosHospital = {
            ...req.body,
            user: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalID, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospitalActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Algo salio mal. Por favor hable con el administrador'
        });
    }

};

const deleteHospitals = async(req, res = response) => {

    const hospitalID = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(hospitalID);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: true,
                msj: 'No se encontro ningun Hospital'
            });
        }

        await Hospital.findOneAndDelete(hospitalID);

        res.json({
            ok: true,
            msg: 'El hospital ha sido eliminado'
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
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
};