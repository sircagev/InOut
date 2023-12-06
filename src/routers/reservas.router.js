import { Router } from "express";
import { RegistrarReserva, ActualizarReserva, listarReservas, BuscarReserva, EliminarReserva, ReservaPrestamo, ReservaRechazada, ReservaEntregada } from "../controllers/Reservas.controller.js";

const route = Router();

route.post('/registrar', RegistrarReserva);
route.get('/', listarReservas);
route.get('/:id', BuscarReserva);
route.put('/:id/actualizar', ActualizarReserva);
route.delete('/:id/eliminar', EliminarReserva);

route.put('/:id/prestamo', ReservaPrestamo);
route.put('/:id/rechazar', ReservaRechazada);
route.put('/:id/entregar', ReservaEntregada);


export default route;