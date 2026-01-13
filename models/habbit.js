const mongoose = require("mongoose");

const habitschema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  frequency: {
    type: String,
    require: true,
    trim: true, 
    // enum: ["daily", "weekly", "monthly", "yearly"],
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
  },
 
   history:{
    type:[String],
    default:[],
  }
},
   {timestaps:true}
);

module.exports=mongoose.model("Habit",habitschema)

