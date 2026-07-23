import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../services/socket";
import "../styles/Cocinero.css"; 

function Cocinero(){

  const [pedidos,setPedidos]=useState([]);

  const cargarPedidos=async()=>{
    const respuesta =
    await axios.get(
      "[https://pa-integral-backend.onrender.com/api/pedidos](https://pa-integral-backend.onrender.com/api/pedidos)"
    );

    setPedidos(
      respuesta.data
    );
  };

  useEffect(()=>{
    cargarPedidos();

    socket.on(
      "pedidoRecibido",
      (pedido)=>{
        setPedidos((actuales)=>[
          ...actuales,
          pedido
        ]);
      }
    );

    return()=>{
      socket.off(
        "pedidoRecibido"
      );
    };
  },[]);

  const cambiarEstado=async(id,estado)=>{
    await axios.put(
     `[https://pa-integral-backend.onrender.com/api/pedidos/$](https://pa-integral-backend.onrender.com/api/pedidos/$){id}`,
      {
        estado
      }
    );

    socket.emit(
      "estadoPedido",
      {
        id,
        estado
      }
    );

    cargarPedidos();
  };

  return(
    <div className="cocinero-container">
      <h1 className="cocinero-title">
        Panel del Cocinero
      </h1>

      <div className="pedidos-grid">
        {
          pedidos.map(
            (pedido)=>(
              <div className="pedido-card" key={pedido._id}>
                <div>
                  <h3>
                    Mesa {pedido.mesa}
                  </h3>

                  <p><strong>Platos:</strong></p>

                  <ul>
                    {
                      pedido.platos.map(
                        (plato)=>(
                          <li key={plato}>
                            {plato}
                          </li>
                        )
                      )
                    }
                  </ul>

                  <p className="pedido-estado">
                    <strong>Estado:</strong> {pedido.estado}
                  </p>
                </div>

                <div className="actions">
                  <button
                    className="btn-aceptar"
                    onClick={()=>
                      cambiarEstado(
                        pedido._id,
                        "En preparación"
                      )
                    }
                  >
                    Aceptar
                  </button>

                  <button
                    className="btn-listo"
                    onClick={()=>
                      cambiarEstado(
                        pedido._id,
                        "Listo para servir"
                      )
                    }
                  >
                    Listo
                  </button>
                </div>
              </div>
            )
          )
        }
      </div>
    </div>
  )
}

export default Cocinero;