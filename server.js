import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express ()
const PORT = process.env.PORT            

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MOGODB_URI)
    .then(() => console.log('Conectado a Atlas'))
    .catch(err => console.error('Error de conxion: ', err))

app.listen(PORT, () => console.log('Servidor corriendo en http://localhost:5000'))




