import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    distancefromcenter: {
      type: String,
      required: true,
    },
    images: [{ image: { type: String, required: true } }],
    rooms: [String],
    rating: {
      type: Number,
      min: [0, "minimum 0 stars is allowed"],
      max: [5, "you can give upto five stars only"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default new mongoose.model("Hotel", HotelSchema);
