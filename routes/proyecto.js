const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//crea proyecto
//api/proyecto
router.post(
  "/",
  auth,
  [
    check("name", "El nombre del proyecto es obligatorio").not().isEmpty(),
    check("name", "El nombre debe ser minimo de 6 caracteres").isLength({
      min: 3,
    }),
  ],
  proyectoController.crearProyecto
);

router.get("/", auth, proyectoController.obtenerPoyectos);

router.put(
  "/:id",
  auth,
  [
    check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty(),
    check("nombre", "El nombre debe ser minimo de 6 caracteres").isLength({
      min: 3,
    }),
  ],
  proyectoController.actualizarProyecto
);

router.delete(
  "/:id",
  auth,
  proyectoController.eliminarProyecto
);

module.exports = router;
