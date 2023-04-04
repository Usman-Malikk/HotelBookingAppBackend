import express from "express";
import { getUserDetail, Login } from "../../Controllers/Auth/auth.js";
import ErrorHandling from "../../Assets/errorHandling.js";
import {
  verifyAdmin,
  VerifyToken,
} from "../../Assets/authentication/authentication.js";

const Router = express.Router();

// Login User
Router.post("/login", Login, ErrorHandling);
Router.get("/getuserdetail", VerifyToken, verifyAdmin, getUserDetail);

// Logout User

export default Router;
