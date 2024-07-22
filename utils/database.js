import mongoose from "mongoose";

let isConnected = false;

export default async function connectToDB() {
  const URI_DB = process.env.MONGODB_URI;
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is Already Connected");
    return;
  }
  try {
    await mongoose.connect(URI_DB, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
}
// export default connectToDB;
