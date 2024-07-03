const {response} = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) =>{
    const token = req.header('x-token');
    if(!token) {
        res.status('400').json({
            ok:false,
            msg:'No hay token en la petición'
        })
    }

    try {
        const payload = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        );

        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok:false,
            msg:'error al validar token'
        })
    }

    next();
}


module.exports = {
    validarJWT
}