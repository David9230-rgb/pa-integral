import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("mozo");

  const navigate = useNavigate();

  const registrarUsuario = async (e) => {
    e.preventDefault();

    try {
      // URL Limpia sin formato Markdown
      await axios.post("https://pa-integral-backend.onrender.com/api/usuarios/registro", {
        nombre,
        usuario,
        password,
        rol
      });

      alert("¡Usuario registrado con éxito!");
      navigate("/");
    } catch (error) {
      console.log(error);
      const mensajeError = error.response?.data?.mensaje || error.response?.data?.error || "Error al registrar el usuario";
      alert(mensajeError);
    }
  };

  return (
    <div className="register-container">
      <nav className="navbar">
        <div className="nav-buttons">
          <Link to="/" className="btn-nav">Sign In</Link>
        </div>
      </nav>

      <div className="form-card">
        <p className="sub-header">
          ¿Ya tienes una cuenta? <Link to="/">Login</Link>
        </p>

        <form onSubmit={registrarUsuario} className="register-form">
          <input
            type="text"
            className="input-field"
            placeholder="Nombre Completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <input
            type="text"
            className="input-field"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />

          <input
            type="password"
            className="input-field"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select 
            className="select-field" 
            value={rol} 
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="mozo">Rol: Mozo</option>
            <option value="cocinero">Rol: Cocinero</option>
          </select>

          <button type="submit" className="btn-submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;