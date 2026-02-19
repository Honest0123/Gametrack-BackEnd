# 🎮 GameTrack API

API REST para la gestión de videojuegos y reseñas.

## 🚀 Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv
- CORS

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz:

```
PORT=5000
MONGODB_URI=mongodb+srv://juanfranco8b_db_user:Honest0.@honest0.avi5gze.mongodb.net/Games?appName=Honest0
```

## 📦 Instalación

```
npm install
```

## ▶️ Ejecución

```
npm start
```

El servidor se ejecutará en:

```
http://localhost:5000
```

## 🧠 Estructura del proyecto

- Modelos de datos con Mongoose
- Rutas para videojuegos
- Rutas para reseñas
- Conexión a MongoDB Atlas

## 📌 Endpoints principales

### 🎮 Juegos

- `GET /games` → obtener todos los juegos
- `GET /games/:id` → obtener juego por ID
- `GET /games?genre=accion` → filtrar por género

### 📝 Reseñas

- `POST /reviews` → crear reseña
- `GET /reviews/:gameId` → obtener reseñas de un juego

## 🗄 Base de datos

La información se almacena en MongoDB Atlas mediante Mongoose.

## 🔗 Frontend del proyecto

https://github.com/Honest0123/Gametrack-FrontEnd

## 👨‍💻 Autor

Juan David Franco Salinas
