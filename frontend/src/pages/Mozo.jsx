import { useState } from "react";
import axios from "axios";
import socket from "../services/socket";
import "../styles/Mozo.css"; // Importamos los estilos del mozo

function Mozo(){

  const [mesa,setMesa] = useState("");
  const [platos,setPlatos] = useState([]);

  const listaPlatos = [
    "Hamburguesa",
    "Pizza",
    "Ensalada César",
    "Refresco",
    "Lomo Saltado"
  ];

  const seleccionarPlato = (plato)=>{
    if(platos.includes(plato)){
      setPlatos(
        platos.filter(
          (item)=>item!==plato
        )
      );
    }else{
      setPlatos([
        ...platos,
        plato
      ]);
    }
  };

  const enviarPedido = async()=>{
    try{
      const respuesta = await axios.post(
       "[https://pa-integral-backend.onrender.com/api/pedidos](https://pa-integral-backend.onrender.com/api/pedidos)",
        {
          mesa,
          platos,
          mozo:"Jeremy"
        }
      );

      socket.emit(
        "nuevoPedido",
        respuesta.data.pedido
      );

      alert(
        "Pedido enviado correctamente"
      );

      setMesa("");
      setPlatos([]);

    }catch(error){
      alert(
        "Error al crear pedido"
      );
    }
  };

  return(
    <div className="mozo-container">
      <h1 className="mozo-title">
        Panel del Mozo
      </h1>

      <div className="mozo-card">
        <h3 className="section-title">
          Seleccionar mesa
        </h3>

        <select
          className="mozo-select"
          value={mesa}
          onChange={
            (e)=>setMesa(e.target.value)
          }
        >
          <option value="">
            Seleccione
          </option>
          <option value="1">
            Mesa 1
          </option>
          <option value="2">
            Mesa 2
          </option>
          <option value="3">
            Mesa 3
          </option>
          <option value="4">
            Mesa 4
          </option>
          <option value="5">
            Mesa 5
          </option>
        </select>

        <h3 className="section-title">
          Seleccionar platos
        </h3>

        <div className="platos-grid">
          {
            listaPlatos.map(
              (plato)=>(
                <label className="plato-item" key={plato}>
                  <input
                    type="checkbox"
                    checked={
                      platos.includes(plato)
                    }
                    onChange={
                      ()=>seleccionarPlato(plato)
                    }
                  />
                  {plato}
                </label>
              )
            )
          }
        </div>

        <h3 className="section-title">
          Pedido actual
        </h3>

        <div className="resumen-box">
          <p>
            <strong>Mesa:</strong> {mesa || "Ninguna seleccionada"}
          </p>
          <p>
            <strong>Platos:</strong>
          </p>
          <ul>
            {
              platos.map(
                (plato)=>(
                  <li key={plato}>
                    {plato}
                  </li>
                )
              )
            }
          </ul>
        </div>

        <button
          className="btn-enviar"
          onClick={enviarPedido}
        >
          Enviar pedido
        </button>
      </div>
    </div>
  );
}

export default Mozo;