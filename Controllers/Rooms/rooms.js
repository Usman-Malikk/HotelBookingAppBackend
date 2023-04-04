import Room from "../../Models/Rooms/rooms.js";
import Hotel from "../../Models/Hotel/hotel.js";

// create Rooom
export const createRoom = async (req, res, next) => {
  let images = [];
  req.files.map((e) => {
    images.push({
      image: e.filename,
    });
  });

  try {
    // For Room save
    const Data = {
      name: req.body.name,
      description: req.body.description,
      room_no: req.body.room_no,
      allowed_person: req.body.allowed_person,
      reserved_date: req.body.reserver_date,
      images: images,
    };
    const newRoom = new Room(Data);
    const save_room = await newRoom.save();
    // update in hotel too
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.hotelid,
      {
        $push: { rooms: save_room._id },
      },
      { new: true }
    );

    res.status(200).json({
      message: "room created successfully",
      responceCode: 200,
      success: 200,
      room: save_room,
    });

    //
  } catch (e) {}
};
// Get All Rooms
export const getAllRoom = async (req, res, next) => {
  try {
    const Data = await Room.find();
    res.status(200).json({
      success: true,
      responceCode: 200,
      data: Data,
    });
  } catch (e) {
    next(e);
  }
};
// Get  Rooms by id
export const getRoomByID = async (req, res, next) => {
  try {
    const filteredRoom = await Room.findById(req.params.room_id);
    res.status(200).json({
      success: true,
      responceCode: 200,
      data: filteredRoom,
    });
  } catch (e) {
    next(e);
  }
};

// Delete Room by id

export const deleteroombyid = async (req, res, next) => {
  try {
    // First we remove room by room
    const room_id = req.params.room_id;
    console.log("🚀 ~ file: rooms.js:77 ~ deleteroombyid ~ room_id:", room_id);
    // let deleteRoom = await Room.findByIdAndDelete(room_id);
    // Now remove it from The hotel table
    let updatetheHotel = await Hotel.aggregate([
      {
        $match: { rooms: room_id },
      },
      {
        // $update: {
        $set: {
          rooms: {
            $filter: {
              input: "$rooms",
              as: "input",
              cond: { $ne: ["$$input", `${room_id}`] },
            },
          },
          // },
        },
      },
    ]);
    console.log(
      "🚀 ~ file: rooms.js:96 ~ deleteroombyid ~ updatetheHotel:",
      updatetheHotel
    );

    const UpdatedHotelNew = await Hotel.findByIdAndUpdate(
      updatetheHotel[0]._id,
      {
        $set: updatetheHotel[0],
      },
      { new: true }
    );

    res.status(200).json({
      updatedHote: UpdatedHotelNew,
      message: "Room has been deleted",
      responceCode: 200,
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

// Practise
const UpdateRoom = () => {
  const Room_id = req.params.room_id;
  try {
    let UpdatedRoom = Room.aggregate([
      {
        $match: { rooms: Room_id },
      },
      {
        //Update The Document now

        $set: {
          rooms: {
            $filter: {
              input: "$rooms",
              as: "input",
              cond: { $ne: ["$$input", Room_id] },
            },
          },
        },
      },
    ]);
  } catch (e) {}
};
