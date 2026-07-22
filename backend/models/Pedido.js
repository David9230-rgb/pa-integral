import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({

  mesa:{
    type:Number,
    required:true
  },

  platos:[
    {
      type:String,
      required:true
    }
  ],

  estado:{
    type:String,
    default:"Pendiente"
  },

  mozo:{
    type:String,
    required:true
  },

  fecha:{
    type:Date,
    default:Date.now
  }

});


const Pedido = mongoose.model(
  "Pedido",
  pedidoSchema
);


export default Pedido;