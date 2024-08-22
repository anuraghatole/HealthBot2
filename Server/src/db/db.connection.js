import mongoose from "mongoose";

export const mongoDB = async (url) => {
  try {
    await mongoose
      .connect(url)
      .then(() => {
        console.log("mongoDB connected");
      })
      .catch((error) => {
        console.log("error occoured in mongoDb connection: ", error);
      });
  } catch (error) {
    console.log("error occoured while connecting to database", error);
  }
};
