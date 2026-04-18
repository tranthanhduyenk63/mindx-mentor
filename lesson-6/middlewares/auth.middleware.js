import { sessions } from "../controllers/customer.controller.js";

export const authMiddleware = (req, res, next) => {
  const apiKey = req.query.apiKey;
  if (!apiKey) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const [web, customerId, email, sessionId] = apiKey.split(" ");
  const session = sessions.find((session) => session.id === sessionId);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (session.expiresAt < new Date()) {
    return res.status(401).json({ message: "Session expired" });
  }
  next();
};
