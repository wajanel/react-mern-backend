const express = require('express');
const { dbConnection } = require('./database/config');
const path = require('path')
const cors = require('cors')
require('dotenv').config();


//crea el servidor
const app = express();

//base de datos
dbConnection();

app.use(cors());

app.use(express.static('public'))

app.use(express.json())

//crea las rutas
//rutas de autenticacion
app.use('/api/auth/',  require('./routes/auth'))

//rutas de calendario
app.use('/api/events', require('./routes/events'))

app.use('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})


//escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})




