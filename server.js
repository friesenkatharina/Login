import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import Mongoose from "./services/mongoose.js";
import userRoute from "./routes/userRoute.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import config from "./config/config.js";

Mongoose.connect();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const clientUrl = `http://localhost:${config.port}`;

// Middleware stack
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Middleware routes
app.use("/app/user", userRoute);

// !! Your middleware should not go below this line !!
// Serve frontend client/build folder
app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

app.listen(config.port, () => {
  console.log(`The server 🙈 is listening on port ${config.port}`);
  console.log(`Visit ${clientUrl} in your browser`);
});
