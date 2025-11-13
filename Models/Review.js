import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    juegoId: {type:mongoose.Types.ObjectId, required: true},
    puntuacion: {type:Number, required: true},
    textoReseña: {type:String, requiered: true},
    horasJugadas: {type:Number, requiered: true},
    dificultad: {type:String, required: true},
    recomendaria:  {type: Boolean},
    fechaCreacion: {type: Date, default: Date.now},
    fechaActualizaccion: {type: Date, default: Date.now}
})

export default mongoose.model('ReviewModel', reviewSchema)
