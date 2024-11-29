const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config()
app.use(express.json());


app.use(cors({
    origin: ["http://localhost:5173",], 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  }));


  app.listen(3000, () => {
    console.log("server running http://localhost:3000/");
  });