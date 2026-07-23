import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"; // Importamos los estilos coincidentes

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await axios.post(
        "[https://pa-integral-backend.onrender.com/api/usuarios/login](https://pa-integral-backend.onrender.com/api/usuarios/login)",
        {
          usuario,
          password
        }
      );

      localStorage.setItem(
        "token",
        respuesta.data.token
      );

      localStorage.setItem(
        "rol",
        respuesta.data.usuario.rol
      );

      if(respuesta.data.usuario.rol === "mozo"){
        navigate("/mozo");
      }else{
        navigate("/cocinero");
      }

    } catch(error){
      console.log(error);

      if(error.response){
        alert(error.response.data.mensaje);
      }else{
        alert("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div className="login-container">
      {/* Navbar idéntica a Register */}
      <nav className="navbar">
        
       
        <div className="nav-buttons">
    
          <Link to="/register" className="btn-nav">Sign Up</Link>
        </div>
      </nav>

      {/* Tarjeta Glassmorphic */}
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
            onChange={(e)=>setUsuario(e.target.value)}
          />

          <input
            type="password"
            className="input-field"
            placeholder="Contraseña"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
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