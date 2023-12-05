import { Router } from "express";
import { RegistrarDetalle, listardetalles, BuscarDetalle, ActualizarDetalle, EliminarDetalle } from "../controllers/DetalleUbicacion.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarDetalle);
route.get('/listar', listardetalles);
route.get('/buscar/:id', BuscarDetalle);
route.put('/actualizar/:id', ActualizarDetalle);
route.delete('/eliminar/:id', EliminarDetalle);


export default route;