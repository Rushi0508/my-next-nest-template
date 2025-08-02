export const envConfig = {
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET!,
    url: process.env.NEXTAUTH_URL!,
    providers: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
  },
  urls: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
};
