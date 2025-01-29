import mongoose from "mongoose";

type DatabaseConnection = {
  isConnected?: number;
};

const connection: DatabaseConnection = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Database Already connected");
    return;
  }
  try {
    const mongoDbUrl = process.env.MONGO_DB_URL;
    if (!mongoDbUrl) {
      throw new Error("MONGO_DB_URL is not defined");
    }
    const database = await mongoose.connect(mongoDbUrl);
    if (database) {
      console.log(database);
      connection.isConnected = database.connections[0].readyState;
      console.log("Database connected successfully");
    }
  } catch (err) {
    console.log("Error while connection the database", err);
    process.exit(1); //forcefully exit as the application not works without the DB connection.
  }
};

export default dbConnect;