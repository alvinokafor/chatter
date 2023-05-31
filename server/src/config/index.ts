import dotenv from "dotenv";
import { CorsOptions } from "cors";
import connectDB from "./db";
class Config {
  PORT: number;
  CORS: CorsOptions;
  constructor() {
    dotenv.config();
    this.PORT = this.getPort();
    this.CORS = {
      origin: process.env.CLIENT_URL as string,
      credentials: true,
    };
  }
  async init() {
    const db_url = process.env.MONGODB_CLIENT as string;
    await connectDB(db_url);
  }
  getPort(): number {
    let port = parseInt(process.env.PORT as string);
    if (isNaN(port)) port = 3500;
    return port;
  }
}

const config = new Config();
export default config;
