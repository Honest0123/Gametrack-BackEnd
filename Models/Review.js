import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    juegoId: {type: mongoose.Types.ObjectId, ref: 'Game', required: true},
    puntuacion: {type:Number, required: true},
    textoReseña: {type:String, required: true},
    horasJugadas: {type:Number, required: true},
    dificultad: {type:String, required: true},
    recomendaria:  {type: Boolean},
    fechaCreacion: {type: Date, default: Date.now},
    fechaActualizaccion: {type: Date, default: Date.now}
})

export default mongoose.model('Review', reviewSchema)
