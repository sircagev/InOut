import { Router } from "express";
import { RegistrarCategoria, listarCategoria } from "../controllers/CategoriaElemento.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarCategoria);
route.get('/listar', listarCategoria);


export default route;