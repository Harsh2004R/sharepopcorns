import mongoose from "mongoose";

const dataBaseConnection = async () => {
  try {
    const URL = process.env.MONGO_URI;
    if (!URL) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(URL);
    console.log("Data base Connected");
  } catch (error) {
    console.log(
      "============================ data base failed to connect ============================",
      error,
    );
    process.exit(1);
  }
};

export { dataBaseConnection };
