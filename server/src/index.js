import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

// const相当于int
const app = express();

// 前端的call都会变成json格式
app.use(express.json());
app.use(cors());

// name of path, 
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// 连接mongodb with pw
mongoose.connect("mongodb+srv://yuyax:mern123@recipes.vhokto8.mongodb.net/recipes?retryWrites=true&w=majority");

// input = None. output is console.log

// lamda function: a => b; a = input, b = f(x)
app.listen(3001, () => console.log("SERVER STARTED!"));
