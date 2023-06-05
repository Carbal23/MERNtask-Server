const Proyecto = require("../models/proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    //crear proyecto
    const proyecto = new Proyecto(req.body);

    //guardar el creador via jwt
    proyecto.creador = req.usuario.id;

    //guardar el proyecto
    await proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//obtine los proyectos del usuario actual
exports.obtenerPoyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error");
  }
};

// editar el nombre de un proyecto
exports.actualizarProyecto = async (req, res) => {
  const errores = validationResult(req);

  //extraer informacion del proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    //revisar el id
    let proyecto = await Proyecto.findById(req.params.id);

    //si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
    res.json(proyecto);

    //
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//eliminar un proyecto
exports.eliminarProyecto = async (req, res) => {
  try {
    //revisar el id
    let proyecto = await Proyecto.findById(req.params.id);

    //si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //eliminar el proyecto
    await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto Eliminado" });
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
