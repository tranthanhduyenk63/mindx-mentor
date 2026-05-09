import jwt from "jsonwebtoken";

export const AuthMiddleware = {
  validateApiKey: async (req, res, next) => {
    const authorization = req.headers["authorization"] ?? "";
    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        req.customerId = decoded.customerId;
        req.name = decoded.name;
        req.role = decoded.role;
        req.email = decoded.email;
        next();
      } catch (error) {
        console.log("error ==== ", error);
        return res.status(401).json({ message: "Token is invalid" });
      }
    }
    // const apiKey = req.headers.apikey;
    // if (!apiKey) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    // const [web, customerId, email, secretKey] = apiKey.split("-");
    // if (secretKey !== process.env.SECRET_KEY) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // req.customerId = customerId;
    // req.email = email;
    // next();
  },
};
