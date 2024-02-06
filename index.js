//import the npm packages

import express from "express";
//object modeling tool
import mongoose from "mongoose";
//loading environment variables from .env file
import dotenv from "dotenv";
// create an express app instance
const app = express();
//let's load the environment varibles
dotenv.config();

//let's create a variable and we can get the PORT from .env file by
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

//Let's connect to MongoDB
//using Mongoose and log a success message upon connection.
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB Connected Successfully.");

    //Start Express.js server on specified `PORT`
    //and log its running status to the console.
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
//create a model named "UserModel" for the "users" collection using the schema.
const UserModel = mongoose.model("users", userSchema);

//now let me create get request to display data from databse
app.get("/getUsers", async (req, res) => {
  const userData = await UserModel.find();
  res.status(200).json(userData);
});
