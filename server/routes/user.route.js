import express from "express"
import { register, login } from "../controller/user.controller.js"
import { Router } from "express"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
export default router