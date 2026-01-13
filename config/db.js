const mongoose=require("mongoose");

const uri="mongodb+srv://pratapb2001_db_user:champisbhanu@cluster0.0qweujj.mongodb.net/db_habbits?appName=Cluster0"

const connectDb=async()=>{
       try{
           await mongoose.connect(uri)
           console.log("connect")
       }
       catch(error){
        console.log(error.message)
       }
}

module.exports=connectDb;