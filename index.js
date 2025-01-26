import express from "express";
import authRoutes from "./routers/auth.js"
import loanRoutes from "./routers/loan.js"
import 'dotenv/config'
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRoutes)
app.use('/loan', loanRoutes);

mongoose
    .connect(process.env.MONGODBURI)
    .then(() => console.log("MongoDB Connnected"))
    .catch((err) => console.log("Error"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
