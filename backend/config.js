// Production environment configuration for backend

const config = {
  // Server
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV || 'development',
  
  // CORS
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  },
  
  // File upload
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedMimes: ['image/png'],
    uploadDir: process.env.UPLOAD_DIR || './uploads',
    tempDir: process.env.TEMP_DIR || './temp',
  },
  
  // Image generation
  generation: {
    timeout: 30000, // 30 seconds
    quality: 95,
    format: 'png',
  },
  
  // Rate limiting
  rateLimit: {
    enabled: process.env.RATE_LIMIT_ENABLED !== 'false',
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX || 100, // requests per window
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'json',
  },
  
  // Cache
  cache: {
    enabled: process.env.CACHE_ENABLED !== 'false',
    ttl: 3600, // 1 hour
  },
  
  // Database (if using)
  database: {
    url: process.env.DATABASE_URL || null,
  },
};

module.exports = config;
