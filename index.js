import express from "express";
import authRoutes from "./routers/auth.js"
import 'dotenv/config'
import mongoose from "mongoose";

const app = express()
const port = 3000


app.use(express.json())

app.use("/auth", authRoutes)

mongoose
    .connect(process.env.MONGODBURI)
    .then(() => console.log("MongoDB Connnected"))
    .catch((err) => console.log("Error"))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
