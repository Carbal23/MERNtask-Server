const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//crear el servidor
const app = express();

//conectar base de datos
conectarDB();

//habilitar cors
app.use(cors());

//habilitar express.json
app.use(express.json({extended: true}));

// puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require("./routes/usuarios"));
app.use('/api/auth', require("./routes/auth"));
app.use('/api/proyecto', require("./routes/proyecto"));
app.use('/api/tarea', require("./routes/tarea"))

//arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});