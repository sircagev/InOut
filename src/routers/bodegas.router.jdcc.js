import { Router } from "express";
import { RegistrarBodega, listarBodegas } from "../controllers/Bodegas.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarBodega);
route.get('/listar', listarBodegas);


export default route;