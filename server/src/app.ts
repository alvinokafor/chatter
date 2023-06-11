import express from "express";
import router from "./routes";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import { errorHandler } from "./middlewares/errors-handler";
import config from "./config";

const app = express();

app.use(cors(config.CORS));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", router);
app.use(errorHandler);

export default app;
