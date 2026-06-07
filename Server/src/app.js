import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/pageRoutes.js";
import dbConnect from "./config/db.js";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
dotenv.config();
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true 
}));
app.use(cookieParser());
dbConnect();

app.use("/api/v1",router);

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})
