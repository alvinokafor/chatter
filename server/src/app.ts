import express from "express";
import router from "./routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errors-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", router);
// app.use(errorHandler);

export default app;
