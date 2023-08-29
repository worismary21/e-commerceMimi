import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import logger from "morgan";
import cors from "cors";

dotenv.config()

dbConnect()

const app = express()

app.use(express.json())
app.use(logger("dev"))
app.use(cors())
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
    res.json({message: "API is running"})
})

const PORT = process.env.PORT || 4001
app.listen(PORT, () => console.log(`app is listening on ${PORT}`))



