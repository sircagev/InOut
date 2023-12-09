import { Router } from "express";
import { RegistrarElemento, listarElementos, BuscarElemento, Actualizarelemento, EliminarElemento, listarElementosConStockBajo } from "../controllers/Elementos.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarElemento);
route.get('/listar', listarElementos);
route.get('/minstock', listarElementosConStockBajo);//se filtran solo elementos con el stock por debajo de 10 unidades
route.get('/buscar/:id', BuscarElemento);
route.put('/actualizar/:id', Actualizarelemento);
route.delete('/eliminar/:id', EliminarElemento);


export default route;