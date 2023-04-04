import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    room_no: {
      type: Number,
      required: true,
    },
    images: [{ image: { type: String, required: true } }],
    allowed_person: {
      type: Number,
      required: true,
    },
    reserved_date: [{ date: { type: Date } }],
  },
  { timestamps: true }
);

export default new mongoose.model("Rooms", RoomSchema);
