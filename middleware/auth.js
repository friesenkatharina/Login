import { verifyJwt } from "../helpers/jwt.js";

export function authorizeJwt(req, res, next) {
  const token = req.cookies.jwt;

  try {
    const decoded = verifyJwt(token);
    if (!decoded) {
      return res.status(401).send("Unathorized");
    }
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
}
