import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  password:
  {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true,
    enum: ["mozo", "cocinero"]
  }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;