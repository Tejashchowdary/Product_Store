//const express = require('express') old method
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
const path = require('path');

import productRouters from "./routes/product.route.js";

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // allows us to accept JSON data in the req.body 

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get("/", (req, res) => {
    res.send("API is running...");
  });

  
app.use("/api/products",productRouters);

app.listen(PORT,()=>{
    connectDB();
    console.log("server started at http://localhost:" + PORT);
});

