const app=require("./app")
const cors=require("cors")
const connectDb=require("./config/db.js")

const PORT=5000;
connectDb();
app.use(cors({
    origin:[
        "http://localhost:3000",
    "https://your-frontend-name.netlify.app"
    ],
    credentials:true
}))
app.listen(PORT,()=>{
    console.log("hello")
})

