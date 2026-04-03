import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './gitkeep/tmp')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

// File size limits: 5MB for images, 100MB for videos
const fileFilter = (req, file, cb) => {
  const maxImageSize = 5 * 1024 * 1024; // 5MB
  const maxVideoSize = 100 * 1024 * 1024; // 100MB
  
  if (file.fieldname === 'thumbnail') {
    if (file.size > maxImageSize) {
      cb(new Error('Thumbnail image must be less than 5MB'))
    } else {
      cb(null, true)
    }
  } else if (file.fieldname === 'videoUrl') {
    if (file.size > maxVideoSize) {
      cb(new Error('Video must be less than 100MB'))
    } else {
      cb(null, true)
    }
  } else {
    cb(null, true)
  }
}

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max
  }
})



