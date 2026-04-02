import { Course } from "../model/course.model.js";
import { User } from "../model/user.model.js";

export const createCourse = async (req, res) => {
    try {
        let { courseTitle, category, description, courseLevel, thumbnail, videoUrl } = req.body;

        courseTitle = courseTitle?.trim();
        category = category?.toLowerCase().trim();
        description = description?.trim();
        courseLevel = courseLevel?.toLowerCase().trim();

        if (!courseTitle || !category || !description || !courseLevel || !thumbnail || !videoUrl) {
            return res.status(400).json({
                success: false,
                message: "All fields (courseTitle, category, description, courseLevel, thumbnail, videoUrl) are required",
            });
        }

const course = await  Course.create({
     courseTitle, 
     category,
     description,
     courseLevel,
     thumbnail,
     videoUrl,
     instructor: req.id
})

return res.status(201).json({ course, message: 'course created' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "faled to create course"
        })
    }
}

export const getcreatorcourse = async  (req,res)=>{
try {
    const userId = req.id
    const course = await Course.find({instructor:userId})
    
    
            if (!course ) {
                return res.status(400).json({
                    course:[],
                    message: "course not found",
                });
            }
            return res.status(200).json({course });
        }
 catch (error) {
    console.log(error);
}
    }

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ ispublished: true }).populate('instructor', 'name photoUrl');
        
        if (!courses || courses.length === 0) {
            return res.status(200).json({
                courses: [],
                message: "No published courses found",
            });
        }
        return res.status(200).json({courses});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch published courses"
        });
    }
} 