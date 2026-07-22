import express from "express";

import {
crearPedido,
obtenerPedidos,
actualizarEstado
}
from "../controllers/pedidoController.js";


const router = express.Router();


router.post(
"/",
crearPedido
);


router.get(
"/",
obtenerPedidos
);


router.put(
"/:id",
actualizarEstado
);


export default router;