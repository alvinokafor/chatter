import dotenv from "dotenv";
import connectDB from "./db";

class Config {
  PORT: number;
  constructor() {
    dotenv.config();
    this.PORT = this.getPort();
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
