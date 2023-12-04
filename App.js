import express from "express";
import bodyParser from "body-parser";
import routeUsuario from "./src/routers/usuario.router";
import routeValidator from "./src/routers/validator.router";

const app=express();

//Configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas
app.get('/',(req, res)=> {
    console.log(process.env);
    res.send('Pagina inicial');
});

servidor.use('/usuario', routeUsuario);
servidor.use('/usuario', routeValidator);

//Servidor
app.listen(3000,()=>{
    console.log("El servidor se esta ejecutando en el puerto 3000");
});