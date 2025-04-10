const express = require("express");
const router = express.Router();
const hamburguesaController = require("../controllers/hamburguesa.controller");

router.get("/hamburguesas", hamburguesaController.adminList);
router.get("/hamburguesas/nuevo", hamburguesaController.formNuevo);
router.post("/saveburguer", hamburguesaController.guardar);
router.get("/hamburguesas/editar/:id", hamburguesaController.formEditar);
router.post("/hamburguesas/editar/:id", hamburguesaController.actualizar);
router.post("/hamburguesas/eliminar/:id", hamburguesaController.eliminar);

module.exports = router;
