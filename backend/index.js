import express from "express";
import { PORT, mongoURL } from "./config.js";
import { Book } from "./models/bookMOdel.js";
import mongoose from "mongoose";
import booksRoute from "./Routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request data
app.use(express.json());

// Middlware for handling CORS Policy
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("WELCOME TO BOOK STORE");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
