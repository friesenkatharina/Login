import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const admin = async (req, res) => {
  console.log(req.user);
  res.send("You are authorized to view this content");
};

export const login = async (req, res) => {
  try {
    // 1. Login-Informationen
    const { username, password } = req.body;

    // 2. Überprüfen, ob der Benutzer existiert
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // 3. Passwortüberprüfung mit bcrypt
    const matched = await bcrypt.compare(password, user.hash);
    if (!matched) {
      return res.status(400).send("Invalid credentials");
    }

    // 4 JWT Token generieren
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + 3600000),
    });
    res.send("Login sucessful");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred during the login process");
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .send("User logged out");
};

export const register = async (req, res) => {
  try {
    // 1. Nimmt die Registrierungsinformationen aus dem Request-Body
    const { username, firstname, lastname, password, email } = req.body;
    console.log("req.body", req.body);
    // 2. Überprüft, ob der Benutzername verfügbar ist
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username is already taken");
    }

    // 3. Verwendet bcrypt, um ein Hash des Passworts zu erstellen
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Erstellt einen neuen Benutzer, wenn alle erwarteten Details vorhanden sind

    const user = new User({
      username,
      firstname,
      lastname,
      email,
      hash: hashedPassword,
    });

    await user.save();

    // Optional: Senden einer Erfolgsmeldung oder weiterer Schritte, wie z.B. das Senden eines Tokens
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("An error occurred during the registration process");
  }
};
