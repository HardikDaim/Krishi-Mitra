const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/createUser");

const mongodb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://hardikdaim:hardikdon2004@cluster0.vuuzkix.mongodb.net/?retryWrites=true&w=majority",
    )
    .then(async () => {
      console.log("Connected to MongoDB");
})
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
mongodb();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use("/api", require("./routes/createUser")); // Mount the 'createUser' module
app.use("/api", require("./routes/displayData"));
app.use("/api", require("./routes/orderData"));
app.use("/api", require("./routes/blogRoute"));


// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// listen
app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
