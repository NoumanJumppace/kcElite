import multer from 'multer'
import path from 'path'
export const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join('src', 'Uploads'))
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.split(' ').join('-')
        const extension = path.extname(fileName)
        const baseName = path.basename(fileName, extension)
        callback(null, baseName + '-' + Date.now() + extension)
    },
})

export const handleMultipartData = multer({
    storage: Storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, callback) => {
        const FileTypes = /jpeg|jpg|png|gif/
        const mimType = FileTypes.test(file.mimetype)
        const extname = FileTypes.test(path.extname(file.originalname))
        if (mimType && extname) {
            return callback(null, true)
        }
        callback(new Error('File type not supported'))
    },
})

export const handleMultipartDataVideo = multer({
    storage: Storage,
    limits: {
        fileSize: 1024 * 1024 * 50,
    },
    fileFilter: (req, file, callback) => {
        const FileTypes = /mp4|avi|mkv|jpeg|jpg|png|gif/
        const mimType = FileTypes.test(file.mimetype)
        const extname = FileTypes.test(path.extname(file.originalname))
        if (mimType && extname) {
            return callback(null, true)
        }
        callback(new Error('File type not supported'))
    },
})
