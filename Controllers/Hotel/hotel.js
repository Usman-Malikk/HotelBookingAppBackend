import Hotel from "../../Models/Hotel/hotel.js";
import user from "../../Models/User/user.js";

export const createHotel = async (req, res, next) => {
  try {
    console.log(req.body);
    const Images = [];
    req.files.map((image) => {
      Images.push({
        image: image.filename,
      });
    });
    const data = {
      name: req.body.name,
      country: req.body.country,
      city: req.body.city,
      description: req.body.description,
      distancefromcenter: req.body.distancefromcenter,
      images: Images,
    };
    const newHotel = new Hotel(data);
    const savehotel = await newHotel.save();
    res.status(200).json({
      success: true,
      responseCode: 200,
      data: savehotel,
    });
  } catch (e) {
    next(e);
  }
};

export const getAllHotel = async (req, res, next) => {
  try {
    const data = await Hotel.find().populate("rooms.room_id");
    res.status(200).json({
      success: true,
      responseCode: 200,
      data: data,
    });
  } catch (e) {
    next(e);
  }
};

export const getHotelById = async (req, res, next) => {
  try {
    console.log("🚀 ~ file: hotel.js:47 ~ getHotelById ~ req:", req.query);

    const data = await Hotel.findById(req.params.id).populate("rooms");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // const data = await user.aggregate([
    //   {
    //     $group: {
    //       _id: null,
    //       TotalItems: {
    //         $push: {
    //           id: "$_id",
    //           name: "$name",
    //           email: "$email",
    //           total: { $avg: "$phone" },
    //         },
    //       },
    //       count: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       items: { $slice: ["$TotalItems", startIndex, limit] },
    //       count: "$count",
    //     },
    //   },
    // ]);
    res.status(200).json({
      success: true,
      responseCode: 200,
      data: data,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteHotelById = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "hotel has been deleted",
      success: true,
      responseCode: 200,
    });
  } catch (e) {
    next(e);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const Images = [];
    if (req.files.length === 0) {
      res.status(400).json({
        message: "error image is required!",
        responseCode: 401,
        status: 401,
      });
    } else {
      req.files.map((image) => {
        Images.push({
          image: image.filename,
        });
      });

      const data = {
        name: req.body.name,
        description: req.body.description,
        images: Images,
      };

      console.log(data);

      const newHotel = await Hotel.findByIdAndUpdate(
        req.params.hotelid,
        {
          $set: data,
        },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        success: true,
        responseCode: 200,
        data: newHotel,
      });
    }
  } catch (e) {
    next(e);
  }
};
