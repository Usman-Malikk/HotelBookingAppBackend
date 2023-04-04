import express from "express";
import ErrorHandling from "../../Assets/errorHandling.js";
import upload from "../../Assets/imagehandling/imageHandling.js";
import {
  createHotel,
  deleteHotelById,
  getAllHotel,
  getHotelById,
  updateHotel,
} from "../../Controllers/Hotel/hotel.js";

const HotelRouter = express.Router();
// Create Hotel
HotelRouter.post(
  "/createhotel",
  upload.array("image"),
  createHotel,
  ErrorHandling
);
// Get All Hotel
HotelRouter.get("/getallhotel", getAllHotel, ErrorHandling);

// Get Hotel By Id
HotelRouter.get("/gethotelbyid/:id", getHotelById, ErrorHandling);

// delete Hotel By Id
HotelRouter.delete("/deletehotelbyid/:id", deleteHotelById, ErrorHandling);

// Update Hotel

HotelRouter.post(
  "/updatehotel/:hotelid",
  upload.array("images"),
  updateHotel,
  ErrorHandling
);

export default HotelRouter;
