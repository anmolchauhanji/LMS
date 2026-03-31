

import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
    },

    description: {
        type: String,
        required: true
    },
    courseprice: {
        type: Number,
    },
    category: {
        type: String,
        required: true
    },
    courseLevel: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    studentsenrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture"
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    ispublished: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true })

export const Course = mongoose.model("Course", CourseSchema)