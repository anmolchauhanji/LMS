import express from "express"
import isAuthenticated from "../middlewares/IsAuthenticated.js"
import { createCourse, getcreatorcourse } from "../controller/course.controller.js"
import { upload } from "../utils/multer.js"

const router = express.Router()


router.route("/").post(isAuthenticated,createCourse)
router.route("/").get(isAuthenticated,getcreatorcourse)
router.route("/:courseId").put(isAuthenticated,upload.single("thumbnail"))
export default router   