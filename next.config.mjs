/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './.next', 
    eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
// Changes the build output directory to `./dist/`.
  }
   
  export default nextConfig