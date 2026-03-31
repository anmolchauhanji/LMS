import express from "express"
import connectdb from "./Databse/db.js";
import dotenv  from "dotenv";
import userrouter from './routes/user.route.js'
import cookieParser from "cookie-parser";
import cors from "cors"
import courseroute from "./routes/course.route.js"
dotenv.config();
// db calling

const PORT = process.env.PORT || 8000
const app = express()

// Middleware order is critical
app.use(cors({
    origin:["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"],
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body)
  next()
})

app.use("/api/v1/user",userrouter)
app.use("/api/v1/course",courseroute)

app.get(('/home'),(req,res)=>{
    
    res.status(200).json({
        success:true,
        message:"rpting working"
    })
})

app.listen(PORT, async ()=>{
    console.log("ENV:", process.env.PORT);
    console.log(`server is listening on port ${PORT}`);
    await connectdb();
})