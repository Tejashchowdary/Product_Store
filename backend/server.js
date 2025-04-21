//const express = require('express') old method
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";

import productRouters from "./routes/product.route.js";

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // allows us to accept JSON data in the req.body 

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.get("/", (req, res) => {
    res.send("API is running...");
  });

  
app.use("/api/products",productRouters);

app.listen(PORT,()=>{
    connectDB();
    console.log("server started at http://localhost:" + PORT);
});

