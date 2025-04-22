export const config = {
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET!,
    url: process.env.NEXTAUTH_URL!,
  },
  urls: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
};
