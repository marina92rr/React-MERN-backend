const {Router} = require('express');        //Importar ruta
const { check} = require('express-validator');        //Para validaciones

const { isDate } = require('../helpers/isDate');
const  {validarCampos} = require('../middlewares/validar-campos');

const { validarJWT} = require('../middlewares/validar-jwt');
const { getEvents, createtEvent, updatetEvent, deleteEvent} = require('../controllers/events');


//-------RUTAS.......
const router = Router();

//Todas las rutas pasan por validar token
router.use(validarJWT);

//peticion obtener eventos
router.get( '/', getEvents)
//Crear nuevo Evento
router.post( 
    '/',
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','La fecha de inicio es obligatorio').custom( isDate ),     
        check('end','La fecha de finalización es obligatorio').custom( isDate ),     

        validarCampos
    ], 
    createtEvent)
//Actualizar nuevo Evento
router.put( '/:id', updatetEvent)
//Borrar nuevo Evento
router.delete( '/:id', deleteEvent)



module.exports = router;        //Exportar ruta