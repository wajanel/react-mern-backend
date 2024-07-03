/* Routas /auth
    host + /api/auth
*/

const {Router} = require('express');
const { check } = require('express-validator')
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { inputValidator } = require('../middlewares/input-validator');
const { validarJWT } = require('../middlewares/jwt-validator');

const router = Router();

router.post('/new', 
    [   
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser mayor a 6 caracteres').isLength({min:6}),
        inputValidator
    ],
    crearUsuario)

router.post('/',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        inputValidator
    ],
    loginUsuario)

router.get('/renew', validarJWT ,revalidarToken)


module.exports = router;