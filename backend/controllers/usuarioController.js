import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registrarUsuario = async (req, res) => {
  try {

    const { nombre, usuario, password, rol } = req.body;

    const existe = await Usuario.findOne({ usuario });

    if (existe) {
      return res.status(400).json({
        mensaje: "El usuario ya existe"
      });
    }

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      usuario,
      password: passwordEncriptada,
      rol
    });

    await nuevoUsuario.save();

    res.json({
      mensaje: "Usuario registrado correctamente"
    });

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
};


export const loginUsuario = async (req, res) => {

  try {

    const { usuario, password } = req.body;

    const usuarioEncontrado = await Usuario.findOne({
      usuario
    });

    if (!usuarioEncontrado) {
      return res.status(400).json({
        mensaje: "Usuario no encontrado"
      });
    }


    const passwordCorrecta = await bcrypt.compare(
      password,
      usuarioEncontrado.password
    );


    if (!passwordCorrecta) {
      return res.status(400).json({
        mensaje: "Contraseña incorrecta"
      });
    }


    const token = jwt.sign(
      {
        id: usuarioEncontrado._id,
        rol: usuarioEncontrado.rol
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );


    res.json({
      mensaje: "Login correcto",
      token,
      usuario: {
        nombre: usuarioEncontrado.nombre,
        rol: usuarioEncontrado.rol
      }
    });


  } catch(error){

    res.status(500).json({
      mensaje:error.message
    });

  }

};