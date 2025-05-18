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
      perplexity: {
        apiKey: process.env.PERPLEXITY_API_KEY!,
        baseURL: process.env.PERPLEXITY_BASE_URL!,
      },
    },
  },
  mail: {
    smtp: {
      host: process.env.SMTP_HOST!,
      port: process.env.SMTP_PORT!,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    },
    defaults: {
      from: process.env.SMTP_FROM!,
      fromName: process.env.SMTP_FROM_NAME!,
    },
  },
  aws: {
    s3: {
      bucket: process.env.AWS_S3_BUCKET!,
      region: process.env.AWS_REGION!,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  },
})
