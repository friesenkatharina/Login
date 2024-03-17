import mongoose from "mongoose";
import config from "../config/config.js";

const { databaseUri } = config;

class MongooseError extends Error {}

class Mongoose {
  static connect() {
    mongoose.set("strictQuery", false);

    mongoose
      .connect(databaseUri)
      .then(() => console.log(`Connected to the database!`))
      .catch((err) => {
        throw new MongooseError(err);
      });
  }
}

export default Mongoose;
