import { Router } from "express";
import { RegistrarDetalleReserva, listarDetallesReserva, BuscarDetalleReserva, ActualizarDetalleReserva, EliminarDetalleReserva } from "../controllers/DetallesReserva.controller.js";

const route = Router();

route.post('/registrar', RegistrarDetalleReserva);
route.get('/', listarDetallesReserva);
route.get('/:id', BuscarDetalleReserva);
route.put('/:id/actualizar', ActualizarDetalleReserva);
route.delete('/:id/eliminar', EliminarDetalleReserva);

export default route;