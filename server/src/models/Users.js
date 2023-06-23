import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // ref是跟着schema，refer to which model
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipes" }]
});

export const UserModel = mongoose.model("users", UserSchema)