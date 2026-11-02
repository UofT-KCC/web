/*
 * reused function compilations
 */

/** threshold 배열 생성함수 */
export const thresholdArray = (steps: number) =>
  Array(steps + 1)
    .fill(0)
    .map((_, index) => index / steps || 0);

const IS_SERVER = typeof window === 'undefined';
const DEFAULT_BASE_URL = 'https://utkcc.com';

function normalizeBaseURL(url?: string) {
  if (!url) return DEFAULT_BASE_URL;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

/** get the current base URL */
export function getURL(path: string) {
  const baseURL = IS_SERVER
    ? normalizeBaseURL(
        process.env.NEXT_PUBLIC_BASE_URL ||
          process.env.VERCEL_PROJECT_PRODUCTION_URL ||
          process.env.VERCEL_URL,
      )
    : window.location.origin;
  return new URL(path, baseURL).toString();
}

// import { getPlaiceholder } from 'plaiceholder';

// /**
//  * Get the base64 blurred image url from the href source url
//  */
// async function getBase64(imageUrl: string) {
//   try {
//     const res = await fetch(imageUrl);
//     if (!res.ok) {
//       throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
//     }

//     const buffer = await res.arrayBuffer();
//     const { base64 } = await getPlaiceholder(Buffer.from(buffer));
//     return base64;
//   } catch (e) {
//     if (e instanceof Error) console.log(e.stack);
//   }
// }
