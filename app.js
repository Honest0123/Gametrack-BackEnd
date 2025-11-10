const express = require('express');
const app = express();

app.get(`/`, (req,res) =>{
    res.send('Hola desde el servidor mas capo')
})

app.listen(3000, () =>{
    console.log('Servidor ejecutandose en htpp://localhost:3000')
})