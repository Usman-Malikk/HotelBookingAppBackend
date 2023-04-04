import express from "express";
import { VerifyToken } from "../../Assets/authentication/authentication.js";
import ErrorHandling from "../../Assets/errorHandling.js";
import {
  CreateUser,
  DeleteUser,
  GetAllUser,
  getUserById,
  updateUser,
} from "../../Controllers/User/user.js";

const Router = express.Router();

// User Routes

// create User
Router.post("/createuser", CreateUser, ErrorHandling);
Router.get("/getalluser", GetAllUser, ErrorHandling);
Router.get("/getuserbyid/:id", getUserById, ErrorHandling);
Router.post("/updateuser", VerifyToken, updateUser, ErrorHandling);
Router.delete("/:id", DeleteUser, ErrorHandling);

export default Router;
