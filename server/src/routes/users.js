import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// async + await
// router.post的argv2的input: 2 argv: request response是固定的前端来的和去的
// ln12见下 
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    // insert user into res and change format to json

    if (user){
        return res.json({ message: "user already exist!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // when we want to create sth, create a new instance of that model
    const newUser = new UserModel({ username: username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User Registered Successfully!"});
});


// router.post("/register", func(req, res))
// def func(req, res):
//     username = req.body.username
//     password = req.body.password
//     user = xxx.findOne()

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user){
        return res.json({ message: "user doesn't exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
        return res.json({ message: "user or password is incorrect!" });
    }

    // sign把user_id变成token，secret是unsign/verify的时候的方法
    // response返回值有两个：token和userID
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
});

export { router as userRouter };

// verifyToken is The middleware
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secret", (err) => {
            // token is incorrect
            if (err) return res.sendStatus(403);
            next();
        });
    } else {
        // no token
        res.sendStatus(401);
    }
};