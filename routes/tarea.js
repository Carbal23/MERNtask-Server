const express = require("express");
const Router = express.Router();
const tareaController = require("../controllers/tareaController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

Router.post("/",
auth,
[
    check("name","El nombre de la tarea es obligatorio").not().isEmpty()
],
tareaController.crearTarea);

Router.get("/",
auth,
tareaController.obtenerTareas
);

Router.put("/:id",
auth,
[
    check("name","El nombre de la tarea es obligatorio").not().isEmpty()
],
tareaController.actualizarTarea);

Router.delete("/:id",
auth,
tareaController.eliminarTarea)

module.exports = Router;