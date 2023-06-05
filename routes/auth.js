// rutas para agregar autenticar
const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const authController = require ("../controllers/authController");
const auth = require("../middleware/auth")

//autenticar el usuario
//api/auth
router.post("/",
// [
//     check('email','El email es un campo obligatorio').not().isEmpty(),
//     check("email", "Agregar un email valido").isEmail(),
//     check('password','El password es un campo obligatorio').not().isEmpty(),
//     check("password", "El password debe ser minimo de 6 caracteres").isLength({min: 6})
// ],
authController.autenticarUsuario
);

router.get("/",
auth,
authController.usuarioAutenticado
);

module.exports = router;