export const AuthMiddleware = {
  validateApiKey: async (req, res, next) => {
    const apiKey = req.headers.apikey;
    if (!apiKey) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const [web, customerId, email, secretKey] = apiKey.split("-");
    if (secretKey !== process.env.SECRET_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.customerId = customerId;
    req.email = email;
    next();
  },
};
