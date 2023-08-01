export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: { uri: process.env.DB_URI },
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT) || 6379,

  secretKeyJwt: process.env.SECRET_KEY_JWT || 'SECRET_KEY_JWT',
  expiresInJwt: process.env.EXPIRES_IN_JWT || 'EXPIRES_IN_JWT',
});
