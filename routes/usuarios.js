// rutas para agregar usuarios
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const {check} = require("express-validator");

//crear un usuario
//api/usuario
router.post("/",
[
    check('name','El nombre es un campo obligatorio').not().isEmpty(),
    check("name", "El nombre debe ser minimo de 6 caracteres").isLength({min: 6}),
    check('email','El email es un campo obligatorio').not().isEmpty(),
    check("email", "Agregar un email valido").isEmail(),
    check('password','El password es un campo obligatorio').not().isEmpty(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({min: 6})
],
usuarioController.crearUsuario
);

module.exports = router;