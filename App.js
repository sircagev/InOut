import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();

const app=express();

//Configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas
app.get('/',(req, res)=> {
    console.log(process.env);
    res.send('Pagina inicial');
})

//Servidor
app.listen(3000,()=>{
    console.log("El servidor se esta ejecutando en el puerto 3000");
});