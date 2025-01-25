import express from "express";
import { loginValidation, registerValidation } from "../middlewares/authValidation.js";
import { login, signup } from "../controllers/authcontroller.js";



const router = express.Router();

router.post("/login", loginValidation, login)
router.post("/register", registerValidation, signup)


export default router;