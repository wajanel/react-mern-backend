const {Router} = require('express');
const { getEvents, newEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validarJWT } = require('../middlewares/jwt-validator');
const { check } = require('express-validator');
const { inputValidator } = require('../middlewares/input-validator');
const { isDateValid } = require('../helpers/dateValidator');

const router = Router();


router.use( validarJWT );


router.get('/', getEvents);  // ('/', validarJWT, getEvents), si se va a usar el MDW validarJWT en todos 
                            //lados se puede poner global con el: router.use( validarJWT )

router.post('/', [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha es obligatoria').custom(isDateValid),
        check('end', 'la fecha fin es obligatoria').custom(isDateValid),
        inputValidator
    ], newEvent);

router.put('/:id', [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha es obligatoria').custom(isDateValid),
        check('end', 'la fecha fin es obligatoria').custom(isDateValid),
        inputValidator
    ], updateEvent);

router.delete('/:id', deleteEvent);


module.exports = router;