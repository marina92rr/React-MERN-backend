
const { Schema, model} = require('mongoose');


//Los campos que debe tener un usuario
const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
});

//Para quitar datos del JSON( solo la parte visual)
EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;        //Para que aparezca id: ... en vez de _id:...
    return object;
})

module.exports = model('Evento', EventoSchema);       //Exportar usuarioSchema como Usuario