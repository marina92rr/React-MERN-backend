
const {Router} = require('express');
const { check} = require('express-validator');        //Para validaciones
const {validarCampos} = require('../middlewares/validar-campos');

const { crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');     //Importar auth funcion
const { validarJWT } = require('../middlewares/validar-jwt');


//--------RUTAS-------------
const router = Router();


//Registro
router.post('/new',
    [
       check( 'name', 'El nombre es obligatorio').not().isEmpty(),      //.not, .emty = no este vacio
       check( 'email', 'El email es obligatorio').isEmail(),      //.isEmail = si no hay @
       check( 'password', 'El pasword debe ser mayor de 5').isLength({ min: 6 }),      //.not, .emty = no este vacio
       validarCampos
    ],
    crearUsuario,
    ); //

//Login
router.post('/',
    [
        check( 'email', 'El email es obligatorio').isEmail(),
        check( 'password', 'El pasword debe ser mayor de 5').isLength({ min: 6 }),      //.not, .emty = no este vacio
        validarCampos
    ]
    ,loginUsuario);


//Renovar token
router.get('/renew', validarJWT, revalidarToken);


module.exports = router;        //Para exportar