const express=require("express")
const cors=require("cors");

const app=express();

app.use(cors())
app.use(express.json())



app.use("/api/habits",require("./routes/habitsroutes"))
app.use("/api/auth",require("./routes/auth"))

app.get("/api/health",(req,res)=>{
    res.json({status:"Ok"})
})

module.exports=app;