/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,    // or false if you have SWC-specific build issues
    productionBrowserSourceMaps: true,
    // no experimental.allowDevelopmentBuild
  };
  
  export default nextConfig;