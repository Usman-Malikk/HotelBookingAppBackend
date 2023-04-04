import User from "../../Models/User/user.js";

// Create User
export const CreateUser = async (req, res, next) => {
  try {
    let newUser = new User(req.body);
    let saveUser = await newUser.save();
    res.status(200).json({
      success: true,
      responseCode: 200,
      data: saveUser,
    });
  } catch (err) {
    next(err);
  }
};

// Delete User
export const DeleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.params.id);
    res.json({
      success: true,
      data: deletedUser,
      responseCode: 200,
      message: "User deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

// Get All User
export const GetAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({
      data: users,
      success: true,
      responseCode: 200,
    });
  } catch (e) {
    next(e);
  }
};

// Get User By id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.find({ _id: req.params.id });
    res.json({
      data: user,
      success: true,
      responseCode: 200,
    });
  } catch (e) {
    next(e);
  }
};

// Update User by id
export const updateUser = async (user, req, res, next) => {
  try {
    const updatedUser = await User.findOne({
      email: user.email,
      password: user.password,
    });
    console.log(
      "🚀 ~ file: user.js:68 ~ updateUser ~ updatedUser:",
      updatedUser
    );
    if (updatedUser) {
      const updateuser = await User.findByIdAndUpdate(updatedUser._id, {
        $set: { name: req.body.name },
      });
      res.status(200).json({
        message: "User updated successfully",
        status: 200,
        responseCode: 200,
      });
    } else {
      res.status(401).json({
        message: "No user found",
        status: 401,
        responseCode: 401,
      });
    }
  } catch (e) {
    next(e);
  }
};
