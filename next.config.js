/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'res.cloudinary.com'
    ]
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dnxie3elk",
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME:"tirlnr89"
  },
}
 
module.exports = nextConfig

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}
