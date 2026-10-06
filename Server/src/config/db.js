import mongoose from "mongoose";

const dataBaseConnection = async () => {
  try {
    const URL = process.env.MONGO_URI;
    await mongoose.connect(
      "mongodb+srv://harsh:Harsh2004masai@cluster0.5hflrlp.mongodb.net/sharepopcorn?retryWrites=true&w=majority&appName=Cluster0",
    );
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
