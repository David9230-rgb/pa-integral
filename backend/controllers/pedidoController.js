import Pedido from "../models/Pedido.js";


export const crearPedido = async(req,res)=>{

try{

const {
mesa,
platos,
mozo
}=req.body;


const nuevoPedido = new Pedido({
mesa,
platos,
mozo
});


await nuevoPedido.save();


res.json({
mensaje:"Pedido creado correctamente",
pedido:nuevoPedido
});


}catch(error){

res.status(500).json({
mensaje:error.message
});

}

};



export const obtenerPedidos = async(req,res)=>{

try{

const pedidos = await Pedido.find();

res.json(pedidos);


}catch(error){

res.status(500).json({
mensaje:error.message
});

}

};



export const actualizarEstado = async(req,res)=>{

try{


const {id}=req.params;

const {estado}=req.body;


const pedidoActualizado =
await Pedido.findByIdAndUpdate(
id,
{
estado
},
{
new:true
}
);


res.json({
mensaje:"Estado actualizado",
pedido:pedidoActualizado
});


}catch(error){

res.status(500).json({
mensaje:error.message
});

}

};