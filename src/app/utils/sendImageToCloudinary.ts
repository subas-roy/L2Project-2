import { v2 as cloudinary } from 'cloudinary';

export const sendImageToCloudnary = () => {
  // Configuration
  cloudinary.config({
    cloud_name: 'dsyadoiz5',
    api_key: '978849328922677',
    api_secret: 'fR5S5oI-DyZ22B5WMAlp-hamihg',
  });

  cloudinary.uploader.upload(
    'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    {
      public_id: 'shoes',
    },
    function (error, result) {
      console.log(result);
    },
  );
};
