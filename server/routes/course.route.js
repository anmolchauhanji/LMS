import express from "express"
import isAuthenticated from "../middlewares/IsAuthenticated.js"
import { handleMulterError } from "../middlewares/errorHandler.js"
import { createCourse, editcourse, getcreatorcourse, getPublishedCourses } from "../controller/course.controller.js"
import { upload } from "../utils/multer.js"

const router = express.Router()

// Upload multiple files: thumbnail and videoUrl with size limits
const uploadFiles = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'videoUrl', maxCount: 1 }
]);

// Specific routes MUST come before parameterized routes
router.route("/published").get(getPublishedCourses)
router.route("/").post(isAuthenticated, uploadFiles, handleMulterError, createCourse)
router.route("/").get(isAuthenticated, getcreatorcourse)
router.route("/:courseId").put(isAuthenticated, upload.single("thumbnail"), handleMulterError, editcourse)
export default router