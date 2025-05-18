export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  urls: {
    apiUrl: process.env.API_URL!,
    webUrl: process.env.FRONTEND_URL!,
    databaseUrl: process.env.DATABASE_URL!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN ?? '10d',
  },
  keys: {
    apiKey: process.env.API_KEY!,
    llm: {
      openai: {
        apiKey: process.env.OPENAI_API_KEY!,
      },
      gemini: {
        apiKey: process.env.GEMINI_API_KEY!,
        baseURL: process.env.GEMINI_BASE_URL!,
      },
    },
  },
})
