import { Course } from "../model/course.model.js";

export const createCourse = async (req, res) => {
    try {
        let { courseTitle, category } = req.body;

        courseTitle = courseTitle?.trim();
        category = category?.toLowerCase().trim();

        if (!category || !courseTitle ) {
            return res.status(400).json({
                success: false,
                message: "course title and category are  required",
            });
        }

const course = await  Course.create({
     courseTitle, 
     category,
     creator:req.id
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