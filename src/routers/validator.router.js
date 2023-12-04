import { Router } from "express";

import { validarUsuario } from "../controller/validator.controller.js";

const route= Router();

route.post('/validar',validarUsuario);

export default route;