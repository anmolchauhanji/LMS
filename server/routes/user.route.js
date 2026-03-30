import express from "express"
import { register, login, logout, getuserprofile ,updateprofile} from "../controller/user.controller.js"
import { Router } from "express"
import isAuthenticated from "../middlewares/IsAuthenticated.js"
import { upload } from "../utils/multer.js"
const router = express.Router()


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/profile").get(isAuthenticated,getuserprofile)
router.route("/profile/update").put(isAuthenticated, upload.single("profilephoto"), updateprofile) 
export default router   