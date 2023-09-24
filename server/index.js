import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import {register} from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/users.js";
import Post from "./models/posts.js";
import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// /* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


// Mongoose Setup
const PORT = process.env.PORT || 4000;
 await mongoose
  .connect('mongodb+srv://hardikdaim:hardikdon2004@cluster0.vuuzkix.mongodb.net/?retryWrites=true&w=majority' ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(async () => {
      console.log("Connected to MongoDB");
      // Adding Sample Data
      // User.insertMany(users);
      // Post.insertMany(posts);
})
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// // middlewares
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'))
// app.use("/api", require("./routes/createUser")); // Mount the 'createUser' module
// app.use("/api", require("./routes/displayData"));
// app.use("/api", require("./routes/orderData"));
// app.use("/api", require("./routes/blogRoute"));

// listen
app.listen(PORT, () => {
  console.log(`The app is listening on port ${PORT}`);
});
