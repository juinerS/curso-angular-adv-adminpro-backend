const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { deleteOne } = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

// ================================
//     Obtener Usuarios
// ================================
const getUsers = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    // console.log(desde);

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google img').skip(desde).limit(5),
        User.countDocuments(),
    ]);

    // Respuesta
    res.json({
        ok: true,
        'N° Registros': total,
        users
    });
};

// ================================
//     Crear Usuarios
// ================================
const createUsers = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // ============
        // Varificando si el email ya existe en la base de datos
        // ======================================
        const existeEmail = await User.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const user = new User(req.body);

        // Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Guardar usuario en la BBDD
        await user.save();

        // Generando un Token -- JWT
        const token = await generarJWT(user.id);

        // Respuesta
        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

// ================================
//     Actualizar Usuarios
// ================================
const updateUser = async(req, res = response) => {

    // TODO: Validar token y verificar si el usuario existe

    const uid = req.params.id;

    try {

        // Verificando si el id existe
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        // Actuaizar usuario
        const { password, google, email, ...campos } = req.body;

        // Varificando si ya existe un usuario con el email mandado
        if (userDB.email != email) {

            const existeEmail = await User.findOne({ email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuarios con ese email'
                });
            }

        }
        campos.email = email;

        // Actualizando usuaro
        const userUpdated = await User.findByIdAndUpdate(uid, campos, { new: true });

        // Respuesta
        res.json({
            ok: true,
            usuario: userUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

// ================================
//     Eliminar o desactivar Usuarios
// ================================
const deleteUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        // Verificando si el id existe
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        // Eliminando usuario
        await User.findByIdAndDelete(uid);

        // Respuesta
        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

// Exportaciones
module.exports = {
    getUsers,
    createUsers,
    updateUser,
    deleteUser,
};