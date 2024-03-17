import dotenv from "dotenv";

dotenv.config();

class ConfigError extends Error {}

class Config {
  constructor({ DATABASE_URI }) {
    if (!DATABASE_URI) throw new ConfigError("Missing configuration");

    this.databaseUri = DATABASE_URI;
    this.port = 3001;
    // this.dbUser = DB_USER;
    // this.dbPass = DB_PASS;
    // this.dbHost = DB_HOST;
    // this.dbName = DB_NAME;
    // this.jwtSecret = JWT_SECRET;
  }
}

export default new Config(process.env);
