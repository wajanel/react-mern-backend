const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();


//crea el servidor
const app = express();

//base de datos
dbConnection();

app.use(express.static('public'))

app.use(express.json())

//crea las rutas
//rutas de autenticacion
app.use('/api/auth/',  require('./routes/auth'))

//rutas de calendario
app.use('/api/events', require('./routes/events'))

//escuchar peticiones

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})




