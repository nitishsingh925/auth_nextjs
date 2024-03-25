import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const dbConnection = mongoose.connection;

    dbConnection.on("connected", () => {
      console.log("MongoDB connected");
    });

    dbConnection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    dbConnection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });

    return dbConnection;
  } catch (error) {
    console.error("Error in connecting to DB:", error);
    process.exit(1);
  }
};

export { connectDB };
