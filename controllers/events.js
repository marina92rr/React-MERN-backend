const {response} = require('express');
const Evento = require('../models/Evento');



const getEvents = async( req, res= response) =>{

    const eventos = await Evento.find().populate('user', 'name');   //Encuentra todos los eventos y que aparezca el id y name que lo ha escrito

         res.json({
            ok:true,
            eventos
        });
        
}

const createtEvent = async( req, res= response) =>{

    const evento = new Evento( req.body);
    try {
        evento.user = req.uid;
        
       const eventoSave = await evento.save();
        res.json({
            ok:true,
            evento: eventoSave
        })

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updatetEvent = async( req, res= response) =>{

    const eventoId = req.params.id; //conseguir el id del evento
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId);
        if( !evento){
           return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ID'
            })
        }

        //Si el usuario es diferente al id
        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdate = await Evento.findByIdAndUpdate( eventoId, newEvent, {new: true});    //Actualizacion

        res.json({
            ok:true,
            evento: eventUpdate
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const deleteEvent = async( req, res= response) =>{
    
    const eventoId = req.params.id; //conseguir el id del evento
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId);
        if( !evento){
           return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ID'
            })
        }

        //Si el usuario es diferente al id
        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            })
        }

      await Evento.findByIdAndDelete( eventoId);    //Actualizacion

       
        res.json({ ok:true })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getEvents,
    createtEvent,
    updatetEvent,
    deleteEvent
}