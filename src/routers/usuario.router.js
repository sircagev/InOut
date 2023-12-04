import { Router } from "express";
import { RegistrarUsuario, listarUsuario,EliminarUsuario,BuscarUsuario,ActualizarUsuario,EstadoUsuario } from '../controllers/usuario.controller.js'; 

const route = Router();

route.post('/registrar', RegistrarUsuario);
route.get('/listar', listarUsuario);
route.delete('/eliminar/:id', EliminarUsuario);
route.get('/buscar/:id', BuscarUsuario);
route.put('/actualizar/:id', ActualizarUsuario);
route.put('/estado/:id', EstadoUsuario);

export default route;