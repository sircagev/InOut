import express from "express";
import bodyParser from "body-parser";
import routeUsuario from "./src/routers/usuario.router.js";
import routeElemento from "./src/routers/elementos.router.jdcc.js";
import routerCategoria from "./src/routers/categoriaElemento.router.jdcc.js";
import routeBodega from "./src/routers/bodegas.router.jdcc.js";
import routeDetalle from "./src/routers/detalleUbicacion.router.jdcc.js";
import routeValidator from "./src/routers/validator.router.js";

const app=express();

//Configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas
app.get('/',(req, res)=> {
    console.log(process.env);
    res.send('Pagina inicial');
});

app.use('/usuario', routeUsuario);
app.use('/usuario', routeValidator);
app.use('/elemento', routeElemento);
app.use('/categoria', routerCategoria);
app.use('/bodega', routeBodega);
app.use('/detalleUbicacion', routeDetalle);

//Servidor
app.listen(3000,()=>{
    console.log("El servidor se esta ejecutando en el puerto 3000");
});