import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from "dotenv";
dotenv.config()

// console.log(process.env.CLOUDINARY_KEY);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'SPM',
        allowedFormats: ['jpeg', 'png', 'jpg']
    } 
});

