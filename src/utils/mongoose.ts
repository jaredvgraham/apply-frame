import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

const MONGO_URI = process.env.MONGO_URI;

export async function connect() {
  try {
    await mongoose.connect(MONGO_URI);

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");

      mongoose.connection.on("error", (err) => {
        console.log("MongoDB connection error: " + err);
        process.exit();
      });
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit();
  }
}
