const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, API_KEY_CLOUD, API_SECRET_CLOUD} = process.env;


// Configuration 
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY_CLOUD,
  api_secret: API_SECRET_CLOUD
});

const uploadImage = async (imagePath) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
  
      try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        const url = cloudinary.url(result.public_id, {
            Crop: 'fill'
          });
        return url;
      } catch (error) {
        console.error(error);
      }
};

module.exports = {uploadImage};