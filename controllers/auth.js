const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../database/models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) =>{

        try {

            const {email, name, password} = req.body;
            let usuario = await Usuario.findOne({email});
            console.log({usuario})

            if (usuario) {
                return res.status(400).json({
                    ok:false,
                    msg:'Correo ya existe'
                })
            }


            const salt = bcryptjs.genSaltSync();
            const newPassword = bcryptjs.hashSync(password, salt);

            usuario = new Usuario({name, email, password:newPassword});
            await usuario.save();

            const token = await generarJWT(usuario._id, usuario.name);

            res.json({
                ok: true,
                uid:usuario._id,
                name:usuario.name,
                token
            })

        } catch (error) {
            console.log(error);

            res.status(500).json({
                ok:false,
                msg:'comuniquese con el administrador'
            })
        }
    }


const loginUsuario = async (req, res = response) =>{

    try {
            const {email, password} = req.body

            const usuario = await Usuario.findOne({email});
            if(!usuario) {
                return res.status(400).json({
                    ok:false,
                    msg:'Correo no existe'
                })
            }

            const validacionPass = bcryptjs.compareSync(password, usuario.password);

            if(!validacionPass) {
                return res.status(400).json({
                    ok:false,
                    msg:'password incorrecto'
                })
            }

            const token = await generarJWT(usuario._id, usuario.name);

            res.json({
                ok:true,
                msg: 'login usuario',
                uid: usuario._id,
                name: usuario.name,
                token
            })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            msg:'comuniquese con el administrador'
        })
    }
}

const revalidarToken = async (req, res = response) =>{

    try {
        const { uid, name} = req;
        const token = await generarJWT(uid, name);
    
        res.json({
            ok:true,
            msg:'revalidar token',
            token,
            uid,
            name
        })

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'No se pudo regenerar token'
        })
    }
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}