import express from "express";
import ErrorHandling from "../../Assets/errorHandling.js";
import upload from "../../Assets/imagehandling/imageHandling.js";
import {
  createRoom,
  deleteroombyid,
  getAllRoom,
  getRoomByID,
} from "../../Controllers/Rooms/rooms.js";

const RoomRouter = express.Router();

// create Room
RoomRouter.post(
  "/createroom/:hotelid",
  upload.array("image"),
  createRoom,
  ErrorHandling
);

// Find room by id
RoomRouter.get("/getroombyid/:room_id", getRoomByID, ErrorHandling);

// Get All Rooms
RoomRouter.get("/getallroooms", getAllRoom, ErrorHandling);

RoomRouter.delete("/deleteroombyid/:room_id", deleteroombyid, ErrorHandling);

export default RoomRouter;
