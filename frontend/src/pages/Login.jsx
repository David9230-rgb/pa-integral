import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      // URL Limpia sin formato Markdown
      const respuesta = await axios.post(
        "https://pa-integral-backend.onrender.com/api/usuarios/login",
        {
          usuario,
          password
        }
      );

      // Guardar token y rol
      localStorage.setItem("token", respuesta.data.token);

      if (respuesta.data.usuario && respuesta.data.usuario.rol) {
        localStorage.setItem("rol", respuesta.data.usuario.rol);

        if (respuesta.data.usuario.rol === "mozo") {
          navigate("/mozo");
        } else {
          navigate("/cocinero");
        }
      } else {
        alert("Respuesta del servidor incompleta. Intenta nuevamente.");
      }

    } catch (error) {
      console.log(error);

      if (error.response && error.response.data && error.response.data.mensaje) {
        alert(error.response.data.mensaje);
      } else {
        alert("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div className="login-container">
      <nav className="navbar">
        <div className="nav-buttons">
          <Link to="/register" className="btn-nav">Sign Up</Link>
        </div>
      </nav>

      <div className="form-card">
        <p className="sub-header">
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
        
        <h1 className="form-title">
          Sistema de Pedidos
        </h1>

        <form onSubmit={iniciarSesion} className="login-form">
          <input
            type="text"
            className="input-field"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <input
            type="password"
            className="input-field"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn-submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;