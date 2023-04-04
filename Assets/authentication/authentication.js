import jwt from "jsonwebtoken";
// for Verifying  Token
export const VerifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, process.env.secret_key, (err, user) => {
      if (err) {
        res.status(401).json({
          message: "invalid token",
        });
      } else {
       
        next(user);
      }
    });
  } else {
    // handle unauthorized request
    res.status(401).json({
      message: "unauthenticated user",
    });
  }
};

export const verifyAdmin = (user, req, res, next) => {
  console.log("🚀 ~ file: authentication.js:25 ~ verifyAdmin ~ user:", user);
  if (user.isadmin) {
    next(user);
  } else {
    res.status(401).json({
      message: "you have no access for this!",
    });
  }
};
