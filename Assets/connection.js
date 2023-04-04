import mongoose from "mongoose";
export const connectToDb = async () => {
  mongoose
    .connect(process.env.dbConnection)
    .then(() => {
      console.log("🚀 ~  connected to db");
    })
    .catch((e) => {
      console.log("🚀 ~ file: connection.js:7 ~ connectToDb ~ e:", e);
    });
};
