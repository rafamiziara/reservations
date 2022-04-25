import mongoose from "mongoose";
import { secrets } from "@config/secrets";
import { DatabaseConnectionError } from "@errors/DatabaseConnectionError";
import { IDatabase } from "../IDatabase";

export class Mongoose implements IDatabase {
  async connect() {
    if (!secrets.mongoURI) {
      throw new Error("MONGO_URI must be defined");
    }

    try {
      await mongoose.connect(secrets.mongoURI, {});
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error(err);
      throw new DatabaseConnectionError();
    }
  }

  async disconnect() {
    await mongoose.connection.close();
  }
}
