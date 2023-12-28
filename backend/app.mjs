import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import multer, { memoryStorage } from "multer";
import { uploadToS3 } from "./s3.mjs";

const app = express();

const PORT = process.env.PORT || 4000;

const storage = memoryStorage();
const upload = multer({ storage });

app.use(
  cors({
    origin: "*",
  }),
);
app.use(json());

app.post("/videos", upload.single("video"), (req, res) => {
  const { file } = req;
  const userId = req.headers["x-user-id"];

  if (!file || !userId) return res.status(400).json({ message: "Bad request" });

  const { error, key } = uploadToS3({ file, userId });
  if (error) return res.status(500).json({ message: error.message });

  return res.status(201).json({ key });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
