import { v2 as cloudinary } from "cloudinary"

import fs from "fs"
import { config } from "dotenv";
config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});
// let localFilePath = "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg"

// const uploadoncloudinary = async (image) => {

//     try {
//         console.log("localfilepath", localilePath)
//         if (!localFilePath) return null
//         //upload file on cloudinary
//         let response = await cloudinary.uploader.upload(image)
//         // file uploaded sucessfully
//         console.log("File uploaded successfully", response)
//         // console.log("File uploaded successfully", response)
//         // fs.unlinkSync(localFilePath)
//         return response

//     } catch (error) {
//         //deleting the file from the local server
//         // fs.unlinkSync(localFilePath)
//     }

// }
export default cloudinary 