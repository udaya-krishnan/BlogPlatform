const express = require("express");
const cors = require("cors");
const connectDB = require("./database/database");
const userRoute = require("./router/userRoute");
const app = express();
connectDB()

require('dotenv').config()
app.use(express.json());


app.use(cors({
    origin: ["http://localhost:5173",], 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  }));


  app.use('/',userRoute)

  app.listen(3000, () => {
    console.log("server running http://localhost:3000/");
  });