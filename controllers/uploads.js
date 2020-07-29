const path = require('path');
const fs = require('fs');

const response = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');



const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['hospitals', 'medicos', 'users'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo no existe'
        });
    }

    // Varidicando si existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesando imagen
    const file = req.files.image;

    const namecortado = file.name.split('.');
    const extensionArcivo = namecortado[namecortado.length - 1];

    // Validar extensiones
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArcivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo de archivo no esta permitido'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArcivo}`;

    // Path donde voy a guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {

            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });

        }

        // Actualizar imagenes
        updateImage(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

};

const obtenerImage = (req, res = response) => {


    const tipo = req.params.tipo;
    const photo = req.params.photo;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${photo}`);
    if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        return res.sendFile(pathImg);
    }


};

module.exports = {
    fileUpload,
    obtenerImage
};