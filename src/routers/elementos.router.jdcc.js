import { Router } from "express";
import { RegistrarElemento, listarElementos, BuscarElemento, Actualizarelemento, EliminarElemento } from "../controllers/Elementos.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarElemento);
route.get('/listar', listarElementos);
route.get('/buscar/:id', BuscarElemento);
route.put('/actualizar/:id', Actualizarelemento);
route.delete('/eliminar/:id', EliminarElemento);


export default route;