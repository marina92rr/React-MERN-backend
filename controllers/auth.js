
const bcrypt = require('bcryptjs'); //Para encriptar la contraseña: npm i bcryptjs
const {response} = require('express');     //Para autocompletar res.json
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const { email, password} = req.body;
    try {
        let usuario = await Usuario.findOne({email});

        //Si el usuario existe da error
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario existe con este correo'
            });
        }

        usuario = new Usuario( req.body);
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario en la BBDD
        await usuario.save();

        //Generar JWT: Json Web Token
        const token = await generarJWT( usuario.id, usuario.name);
        
        return res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}


const loginUsuario = async(req, res = response) => {

    const {email, password} = req.body;
    try {
        const usuario = await Usuario.findOne({email});

        //Si el usuario no existe -> error
        if(!usuario){
          return res.status(400).json({
            ok:false,
            msg: 'El usuario o contraseña no existe'
          })
        }

        const validPassword = bcrypt.compareSync( password, usuario.password);
        if( !validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Password incorrecto'
            })
        }

           //Generar nuestro JSON WEB TOKEN JWT
           const token = await generarJWT( usuario.id, usuario.name);

           res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const revalidarToken = async(req, res = response) => {

    const {uid , name} = req;
    //generar un nuevo JWT y retornarlo en peticion
    const token = await generarJWT( uid, name);

    res.json({
        ok:true,
        uid,
        name,
        token
    })
}


//Exportar un objeto
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}