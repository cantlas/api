import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";
import async from "async";
import expressValidator from 'express-validator'

import auth from './routes/auth';
import user from './routes/user';
import protest from './routes/protest';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });

// app.use("/v1/auth", auth);
// app.use("/v1/user", user);
app.use("/v1/protest", protest);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080, () => console.log("Running on localhost:8080"));