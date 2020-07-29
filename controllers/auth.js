const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');



const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificando Email
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El Email no es valido'
            });
        }

        // Verificando Contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'La Contraseña no es valida'
            });
        }

        // Generando un Token -- JWT
        const token = await generarJWT(userDB.id);

        res.status(200).json({
            ok: true,
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

const googleSingIn = async(req, res = response) => {

    const googleToken = req.body.token;
    // googleVerify

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const userDB = await User.findOne({ email });

        let user;
        if (!userDB) {
            // Sí el usuario no existe
            user = new User({
                name,
                email,
                password: 'jjj',
                img: picture,
                google: true
            });

        } else {
            // Sí el usuario existe
            user = userDB;
            user.google = true;
        }

        // Guardar en DB
        await user.save();

        // Generando un Token -- JWT
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            msg: 'Google SingIn',
            token
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'El token no es correcto'
        });
    }


};


module.exports = {
    login,
    googleSingIn
};