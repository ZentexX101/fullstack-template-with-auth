require("dotenv").config();

const config = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  // Use 127.0.0.1 instead of localhost to avoid IPv6 (::1) resolution issues on Windows
  database_url:
    process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/fullstack_template",
  jwt_access_secret: process.env.JWT_SECRET_KEY,
  brevo_port: process.env.BREVO_PORT,
  user: process.env.BREVO_USER,
  pass: process.env.BREVO_PASS,
};

module.exports = config;
