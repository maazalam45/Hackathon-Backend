import express from "express";
import authRoutes from "./routers/auth.js"
import 'dotenv/config'
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors());

app.use("/auth", authRoutes)

mongoose
    .connect(process.env.MONGODBURI)
    .then(() => console.log("MongoDB Connnected"))
    .catch((err) => console.log("Error"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
