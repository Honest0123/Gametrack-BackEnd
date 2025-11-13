import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Juegos from './Models/Games.js'
import Review from './Models/Review.js'

dotenv.config()

const app = express ()   
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MOGODB_URI)
    .then(() => {console.log('Conectado a Atlas')
     console.log('Base de datos:', mongoose.connection.db.databaseName)
    })
    .catch(err => console.error('Error de conxion: ', err))


// GET - Obtener todos los juegos
app.get('/api/Games/Juegos', async (req, res) => {
    try {
        const games = await Juegos.find()
        res.json(games)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET - Obtener un juego por ID
app.get('/api/Games/Juegos/id/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' })
        }
        const game = await Juegos.findById(id)
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' })
        }
        res.json(game)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET - Obtener todas las Reseñas
app.get('/api/Games/Reviews', async (req, res) => {
    try {
        const review = await Review.find()
        res.json(review)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// POST - Crear un juego                             
app.post('/api/Games/Juegos', async (req, res) => {
    try {
        const {
            titulo,
            genero,
            plataforma,
            añoLanzamiento,
            desarrollador,
            imagenPortada,
            descripcion,
            completado
        } = req.body

        const nuevoJuego = await Juegos.create({
            titulo,
            genero,
            plataforma,
            añoLanzamiento,
            desarrollador,
            imagenPortada,
            descripcion,
            completado
        })

        return res.status(201).json(nuevoJuego)
    } catch (error) {
        // Errores de validación de Mongoose -> 400
        return res.status(400).json({ message: error.message })
    }
})

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))




