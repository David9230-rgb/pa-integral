import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

dotenv.config();

conectarDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);

app.use("/api/pedidos", pedidoRoutes);


const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


io.on("connection",(socket)=>{

  console.log("Cliente conectado");


  socket.on("nuevoPedido",(pedido)=>{

    socket.broadcast.emit(
      "pedidoRecibido",
      pedido
    );

  });


  socket.on("estadoPedido",(pedido)=>{

    socket.broadcast.emit(
      "pedidoActualizado",
      pedido
    );

  });


  socket.on("disconnect",()=>{

    console.log("Cliente desconectado");

  });


});


app.get("/",(req,res)=>{

res.send("API funcionando");

});


const PORT = process.env.PORT || 5000;


server.listen(PORT,()=>{

console.log(
`Servidor ejecutándose en puerto ${PORT}`
);

});