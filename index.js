import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./Assets/connection.js";
import User from "./Routes/Users/user.js";
import Auth from "./Routes/Auth/auth.js";
import HotelRouter from "./Routes/Hotel/hotel.js";
import Room from "./Routes/Rooms/rooms.js";

// Configure dot env
dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use("/", Auth);
app.use("/hotel", HotelRouter);
app.use("/user", User);
app.use("/room", Room);
// connect to db
connectToDb();

// connect to server
app.listen(process.env.port, () => {
  console.log("Server started on port: ", process.env.port);
});
