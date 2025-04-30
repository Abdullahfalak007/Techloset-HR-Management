// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     // allow <Image> and next-cloudinary to optimize from your Cloudinary
//     domains: [
//       `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}.res.cloudinary.com`,
//     ],
//     unoptimized: true, // ← disable the built-in optimizer
//   },
//   env: {
//     // make these available client-side
//     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
//       process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
//       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
//   },
// };

// module.exports = nextConfig;
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // replace with your actual cloud name
    domains: ["dvxlsjeba.res.cloudinary.com"],
    unoptimized: true, // you can remove this if you prefer Next's built-in optimizer
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  },
};

module.exports = nextConfig;
