import express from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/errors-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);
// app.use(errorHandler);

export default app;
