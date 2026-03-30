import express from "express"
import { register, login, logout, getuserprofile } from "../controller/user.controller.js"
import { Router } from "express"
import isAuthenticated from "../middlewares/IsAuthenticated.js"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/profile").get(isAuthenticated,getuserprofile)
export default router