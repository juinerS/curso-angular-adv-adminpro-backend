const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {

    return new Promise((reslove, reject) => {

        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error: No se pudo generar el JWT');
            } else {
                reslove(token);
            }
        });
    });

};

module.exports = {
    generarJWT
}