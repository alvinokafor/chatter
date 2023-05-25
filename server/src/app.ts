import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3500;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

app.listen(PORT, () => console.log(`⚡ Server running on port ${PORT} ⚡`));
