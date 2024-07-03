const {response} = require('express')
const Evento = require('../database/models/Evento')


const getEvents = async (req, res = response) =>{

    const eventos = await Evento.find().populate('user', 'name')
    res.json({
        ok: true,
        msg:'getEvents',
        eventos
    })
}

const newEvent = async(req, res=response) =>{

    try {
        const evento = new Evento(req.body);
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        res.json({ok:true,
            msg:'newEvent',
            evento:eventoGuardado
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        })
    }
    
}

const updateEvent = async (req, res=response) =>{

    try {
        const idEvent = req.params.id;
        const evento = await Evento.findById(idEvent);


        console.log(evento.user);
        if ( !evento ){
            res.status(401).json({
                ok:false,
                msg:'No se encuentra el evento'
            })
            return;
        }

        if ( evento.user.toString() !== req.uid   ){
            res.status(301).json({
                ok:false,
                msg:'No tiene privilegios para realizar las modificaciones'
            })
            return;
        }

        const eventoActualizar = {...req.body, user:req.uid};

        const eventoActualizado = await Evento.findByIdAndUpdate(idEvent, eventoActualizar, {new:true})
    
        res.json({
            ok:true,
            msg:'updateEvent',
            eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error
        })
    }
}

const deleteEvent = async (req, res=response) =>{

    try {
        const idEvento = req.params.id;
        const evento = await Evento.findById(idEvento);

        if ( !evento ){
            res.status(401).json({
                ok:false,
                msg:'No se encuentra el evento'
            })
            return;
        }

        if ( evento.user.toString() !== req.uid   ){
            res.status(301).json({
                ok:false,
                msg:'No tiene privilegios para realizar las modificaciones'
            })
            return;
        }

        const response = await Evento.findByIdAndDelete(idEvento);

        if( !response) {
            res.status(500).json({
                ok:false,
                msg:'No se encontro el id del evento'
            })
        } else {
            res.json({
                ok:true,
                msg:'deleteEvent',
                idEvento
            })
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            msg:error
        })
    }
}


module.exports = {
    getEvents,
    newEvent,
    updateEvent,
    deleteEvent
}