import express from "express";
import { loginValidation, registerValidation } from "../Middlewares/AuthValidation.js";
import { login, signup } from "../Controllers/authcontroller.js";



const router = express.Router();

router.post("/login", loginValidation, login)
router.post("/register", registerValidation, signup)


export default router;