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


// Permitir solo tu frontend
app.use(cors({ origin: "https://honest0123.github.io" }));

app.get("/api/data", (req, res) => {
    res.json({ message: "Hola desde backend real!" });
});

app.listen(5000, () => console.log("Backend corriendo en puerto 5000"));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {console.log('Conectado a Atlas')
     console.log('Base de datos:', mongoose.connection.db.databaseName)
    })
    .catch(err => console.error('Error de conxion: ', err))


// GET - Obtener todos los juegos
app.get('/api/Games/juegos', async (req, res) => {
    const {genero} = req.query
    
    try {
        let juegos = await Juegos.find()

        if (genero){
            juegos = juegos.filter(juego => {
                const generoJuego = juego.genero.split(/[,]+/);

                const generosLimpios = generoJuego.map(g => g.trim().toLowerCase());

                return generosLimpios.includes(genero.toLowerCase())
            })};
            res.json(juegos)
        }
         catch (error) {
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
    const {juegoId} = req.query

    try {
        const filter = {}
        if (juegoId){
            filter.juegoId = new mongoose.Types.ObjectId(juegoId)
        }
        const review = await Review.find(filter)
        res.json(review)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET - Obtener una review por ID
app.get('/api/Games/reviews/id/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' })
        }
        const review = await Review.findById(id)
        if (!review) {
            return res.status(404).json({ message: 'Juego no encontrado' })
        }
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
            imagen2,
            imagen3,
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
            imagen2,
            imagen3,
            descripcion,
            completado
        })

        return res.status(201).json(nuevoJuego)
    } catch (error) {
        // Errores de validación de Mongoose -> 400
        return res.status(400).json({ message: error.message })
    }
})

// POST - Crear una review                             
app.post('/api/Games/Reviews', async (req, res) => {
    try {
        const {
            juegoId,
            puntuacion,
            textoReseña,
            horasJugadas,
            dificultad,
            recomendaria,
            fechaActualizaccion
        } = req.body

        const nuevaReseña = await Review.create({
            juegoId,
            puntuacion,
            textoReseña,
            horasJugadas,
            dificultad,
            recomendaria,
            fechaActualizaccion
        })

        return res.status(201).json(nuevaReseña)
    } catch (error) {
        // Errores de validación de Mongoose -> 400
        return res.status(400).json({ message: error.message })
    }
})

//PUT - Actualizar un juego por ID
app.put('/api/Games/Juegos/id/:id', async (req, res) => {
    try{
        const {id} = req.params
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'ID invalido'})
        }

        const juegoActualizado = await Juegos.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        
        if(!juegoActualizado) {
            return res.status(404).json({ mesagge: 'Juego no encontrado' })
        }

        res.json({
            mesagge: 'Juego actualizado correctamente',
            juego: juegoActualizado
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//PUT - Actualizar un review por ID
app.put('/api/Games/Reviews/id/:id', async (req, res) => {
    try{
        const {id} = req.params
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'ID invalido'})
        }

        const reviewActualizado = await Review.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        
        if(!reviewActualizado) {
            return res.status(404).json({ mesagge: 'Review no encontrado' })
        }

        res.json({
            mesagge: 'Review actualizado correctamente',
            juego: reviewActualizado
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//DELETE - Eliminar un juego por ID
app.delete('/api/Games/Juegos/id/:id', async (req, res) => {
    try{
        const {id} = req.params      

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID invalido' })
        }

        const juegoEliminado = await Juegos.findByIdAndDelete(id)


        if (!juegoEliminado) {
            return res.status(404).json({ mesagge: 'Juego no encontrado' })
        }

        res.json({
            mesagge: 'Juego eliminado correctamente',
            juego: juegoEliminado
        })

    } catch (error) {
        res.status(500).json({ message: error.mesagge})
    }
})

//DELETE - Eliminar un review por ID
app.delete('/api/Games/Reviews/id/:id', async (req, res) =>{
    try{
        const {id} = req.params

    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID invalido' })
        }

        const reviewEliminado = await Review.findByIdAndDelete(id)

        if (!reviewEliminado) {
            return res.status(404).json({ mesagge: 'Review no encontrado' })
        }

        res.json({
            mesagge: 'Review eliminado correctamente',
            juego: reviewEliminado
        })

    } catch (error) {
        res.status(500).json({ message: error.mesagge})
    }
})


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
