import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/User.routes.js"
import authRoutes from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"

 
dotenv.config()


mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err)
})

const __dirname = path.resolve()



const app = express();

app.use(express.static(path.join(__dirname , "/client/build" )))
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "client", "build" , "index.html"))
})


app.use(express.json())

app.use(cookieParser())

app.listen(3000, () => {
    console.log(`Server listening on port 3000`)
})

app.use(cors())
app.use("/api/user" , userRoutes)
app.use("/api/auth" , authRoutes)
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server error"
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode
    })
})