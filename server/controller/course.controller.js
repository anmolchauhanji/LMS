import { Course } from "../model/course.model.js";
import { User } from "../model/user.model.js";
import { delmediafromcloudinary, uploadmedia } from "../utils/cloudinary.js";
export const createCourse = async (req, res) => {
    try {
        let { courseTitle, category, description, courseLevel } = req.body;
        const thumbnailFile = req.files?.thumbnail?.[0];
        const videoFile = req.files?.videoUrl?.[0];

        courseTitle = courseTitle?.trim();
        category = category?.toLowerCase().trim();
        description = description?.trim();
        courseLevel = courseLevel?.toLowerCase().trim();

        if (!courseTitle || !category || !description || !courseLevel) {
            return res.status(400).json({
                success: false,
                message: "courseTitle, category, description, and courseLevel are required",
            });
        }

        if (!thumbnailFile || !videoFile) {
            return res.status(400).json({
                success: false,
                message: "Both thumbnail image and course video are required",
            });
        }

        let thumbnailResult, videoResult;

        // Upload thumbnail to Cloudinary
        let thumbnailUrl;
        try {
            console.log("Uploading thumbnail...", thumbnailFile.path);
            thumbnailResult = await uploadmedia(thumbnailFile.path);
            thumbnailUrl = thumbnailResult.secure_url;
            console.log("Thumbnail uploaded successfully:", thumbnailUrl);
        } catch (error) {
            console.error("Thumbnail upload error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to upload thumbnail: " + error.message,
            });
        }

        // Upload video to Cloudinary
        let videoUrl;
        try {
            console.log("Uploading video...", videoFile.path);
            videoResult = await uploadmedia(videoFile.path);
            videoUrl = videoResult.secure_url;
            console.log("Video uploaded successfully:", videoUrl);
        } catch (error) {
            console.error("Video upload error:", error);
            // Delete uploaded thumbnail if video upload fails
            if (thumbnailResult && thumbnailResult.public_id) {
                try {
                    await delmediafromcloudinary(thumbnailResult.public_id);
                    console.log("Thumbnail deleted after video upload failure");
                } catch (delError) {
                    console.error("Failed to delete thumbnail:", delError);
                }
            }
            return res.status(500).json({
                success: false,
                message: "Failed to upload video: " + error.message,
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            description,
            courseLevel,
            thumbnail: thumbnailUrl,
            videoUrl: videoUrl,
            instructor: req.id
        });

        return res.status(201).json({ 
            success: true,
            course, 
            message: 'Course created successfully' 
        });

    } catch (error) {
        console.error("CreateCourse Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course: " + error.message
        });
    }
};

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

// export const getPublishedCourses = async (req, res) => {
//     try {
//         const courses = await Course.find({ ispublished: true }).populate('instructor', 'name photoUrl');
        
//         if (!courses || courses.length === 0) {
//             return res.status(200).json({
//                 courses: [],
//                 message: "No published courses found",
//             });
//         }
//         return res.status(200).json({courses});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to fetch published courses"
//         });
//     }
// } 

export const editcourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        let { courseTitle, category, description, courseLevel } = req.body;
        const thumbnail = req.file; // optional

        courseTitle = courseTitle?.trim();
        category = category?.toLowerCase().trim();
        description = description?.trim();
        courseLevel = courseLevel?.toLowerCase().trim();

        if (!courseTitle || !category || !description || !courseLevel) {
            return res.status(400).json({
                success: false,
                message: "courseTitle, category, description and courseLevel are required",
            });
        }

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // ✅ only upload new thumbnail if a file was sent
        let thumbnailUrl = course.thumbnail;
        if (thumbnail) {
            if (course.thumbnail) {
                const publicId = course.thumbnail.split("/").pop().split(".")[0];
                await delmediafromcloudinary(publicId);
            }
            const uploaded = await uploadmedia(thumbnail.path);
            thumbnailUrl = uploaded?.secure_url;
        }

        const updatedata = {
            courseTitle,
            category,
            description,
            courseLevel,
            thumbnail: thumbnailUrl
        };

        course = await Course.findByIdAndUpdate(courseId, updatedata, { new: true });

        return res.status(200).json({
            course,
            message: "Course updated successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update course"
        });
    }
};

