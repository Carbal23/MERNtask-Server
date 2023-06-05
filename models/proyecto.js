const mongoose = require("mongoose");

const ProyectoSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuario"
  },
  creado: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model("proyecto", ProyectoSchema)