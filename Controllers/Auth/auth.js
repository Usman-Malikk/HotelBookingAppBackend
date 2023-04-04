import User from "../../Models/User/user.js";
import jwt from "jsonwebtoken";
// Login

export const Login = async (req, res, next) => {
  try {
    const data = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (data) {
      const token = jwt.sign(
        {
          email: data.email,
          password: data.password,
          isadmin: data.isadmin,
        },
        process.env.secret_key
      );
      res.status(200).json({
        responseCode: 200,
        token: token,
        data: data,
        success: true,
      });
    } else {
      res.status(200).json({
        responseCode: 401,
        message: "user not found!",
        success: false,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const getUserDetail = async (user, req, res, next) => {
  console.log("🚀 ~ file: auth.js:39 ~ getUserDetail ~ user:", user);

  console.log(user);
  res.status(200).json({
    responseCode: 200,
    message: "User authenticated",
    success: true,
  });
};
