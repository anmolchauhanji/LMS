import express from "express"
import isAuthenticated from "../middlewares/IsAuthenticated.js"
import { handleMulterError } from "../middlewares/errorHandler.js"
import { getAllCourses, createCourse, editcourse, getcreatorcourse, getCourseById } from "../controller/course.controller.js"
import { upload } from "../utils/multer.js"

const router = express.Router()

// Upload multiple files: thumbnail and videoUrl with size limits
const uploadFiles = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'videoUrl', maxCount: 1 }
]);

// Public routes (no authentication required)
router.route("/all").get(getAllCourses)

// Protected routes (authentication required)
router.route("/").post(isAuthenticated, uploadFiles, handleMulterError, createCourse)
router.route("/").get(isAuthenticated, getcreatorcourse)
router.route("/courseId").get(isAuthenticated, getCourseById)
router.route("/:courseId").put(isAuthenticated, upload.single("thumbnail"), handleMulterError, editcourse)

export default router