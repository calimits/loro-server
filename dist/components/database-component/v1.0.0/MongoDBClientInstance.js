import mongoose from "mongoose";
import { MongoDBClient } from "./MongoDBClient.js";
export const mongoClient = new MongoDBClient(mongoose);
