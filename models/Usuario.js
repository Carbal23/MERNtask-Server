const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    registro:{
        type: Date,
        default: Date.now() 
    }

})

module.exports = mongoose.model("usuario",UsuarioSchema);