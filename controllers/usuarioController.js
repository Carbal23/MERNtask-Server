const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //revisar si hay error
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;
  try {
    // revisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //crea el nuevo usuario
    usuario = Usuario(req.body);

    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await usuario.save();

    //crear y firmar el jwt
    const payload = {
        usuario:{
            id: usuario.id
        }
    };

    //firmar el jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 72000,
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({token});
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error");
  }
};
