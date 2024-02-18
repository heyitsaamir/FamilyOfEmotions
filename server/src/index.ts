import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
var path = require("path");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Appending extension
  },
});

const upload = multer({ storage: storage });
app.post("/addPage", upload.single("image"), function (req, res, next) {
  console.log(req.file?.filename);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
