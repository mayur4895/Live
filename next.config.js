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
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
},

}
 

module.exports = {
 
  nextConfig
}
