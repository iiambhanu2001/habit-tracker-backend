const mongoose=require("mongoose")

const usersschema=new mongoose.Schema({
   
    name:{
        type:String,
        require:true,
        trim:true,
    },
     email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,

    },
     password:{
        type:String,
        require:true,
        minlenth:6,
        
    }
    

},
  {timestamps:true}
)

module.exports=mongoose.model("user",usersschema)