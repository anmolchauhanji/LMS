import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: 'dg67u8rc7', 
  api_key: '399649965996584', 
  api_secret: 'wRrAiS-HI7HiEvtUkE_K-U2khHg'
});

const uploadmedia = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, {resource_type:"auto"});
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
}; 

const delmediafromcloudinary = async (publicid) =>{
    try {
        const delmediaresult = await cloudinary.uploader.destroy(publicid);
        console.log(delmediaresult);
        
    } catch (error) {
        console.log(error);
        
    }
}
 
const delvideofromcloudinary = async (publicid) =>{
    try {
        const delvideoresult = await cloudinary.uploader.destroy(publicid,{resource_type:"video"});
        console.log(delvideoresult);
        
    } catch (error) {
        console.log(error);
        
    }
}


export {uploadmedia,delvideofromcloudinary,cloudinary,delmediafromcloudinary}