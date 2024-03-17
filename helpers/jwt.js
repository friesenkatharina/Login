import jsonwebtoken from "jsonwebtoken";
import config from "../config/config.js";

export function issueJwt(user) {
  const payload = {
    id: user._id,
  };

  return jsonwebtoken.sign(payload, config.jwtSecret, {
    expiresIn: "1h",
  });
}

export function verifyJwt(token) {
  if (!token) return;

  return jsonwebtoken.verify(token, config.jwtSecret);
}
