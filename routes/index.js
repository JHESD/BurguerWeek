const express = require("express");
const router = express.Router();
const restauranteController = require("../controllers/restaurante.controller");
const indexController = require("../controllers/index.controller");
const controller = require('../controllers/index.controller');

router.get("/restaurantes/:id", controller.verHamburguesas);
router.get("/", indexController.home);
router.post("/hamburguesas/votar/:id", indexController.votar);

module.exports = router;
