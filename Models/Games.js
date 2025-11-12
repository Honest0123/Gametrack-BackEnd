import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema({
    titulo: {type:String, require: true},
    genero:  {type:String,  require: true},
    descripcion: {type:String},
    plataforma: {type:String, require: true},
    
})
