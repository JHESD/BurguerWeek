const express = require("express");
const router = express.Router();
const restauranteController = require("../controllers/restaurante.controller");

router.get("/restaurantes", restauranteController.adminList);
router.get("/restaurantes/nuevo", restauranteController.formNuevo);
router.post("/restaurantes", restauranteController.guardar);
router.get("/restaurantes/editar/:id", restauranteController.formEditar);
router.post("/restaurantes/editar/:id", restauranteController.actualizar);
router.post("/restaurantes/eliminar/:id", restauranteController.eliminar);

module.exports = router;
