// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.CLOUDINARY_CLOUD_NAME + ".res.cloudinary.com"],
  },
};

module.exports = nextConfig;
