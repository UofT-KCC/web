// @ts-check
// import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // 2560/3840 let full-width photos stay sharp on large and Retina screens.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560, 3840],
  },
};

// export default withPlaiceholder(nextConfig);
module.exports = nextConfig;
