/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // ❗️ Allows development-style React errors in a production build
      allowDevelopmentBuild: true,
    },
    // optional, but good to enforce strict checking
    reactStrictMode: true,
    // turn off SWC minification if you suspect it’s hiding something
    swcMinify: false,
  };
  
  export default nextConfig;
  