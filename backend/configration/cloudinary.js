const envConfig = require('./envConfig');

const Cloudinary = require('cloudinary').v2;

envConfig();
     
Cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});



module.exports = Cloudinary;