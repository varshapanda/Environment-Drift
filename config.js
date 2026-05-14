module.exports = {
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET || 'fallback-dev-secret-do-not-use-in-production',
  node_env: process.env.NODE_ENV || 'development',
};
