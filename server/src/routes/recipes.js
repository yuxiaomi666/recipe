import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

// using express framework，
// 1st router func get back all doc in RecipeModel， which is all the recipes
// 结构是("", () => {})
// "/" means root url of app, [when will be invoked]
// ()是一个固定写法了，res和req有固定的意思
// {} call find, if succussful, send response(in json) back to client
router.get("/", async (req, res) => {
    try {
        // find: put everything of the model in response
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

// 2nd router func
// to create a new recipe
router.post("/", verifyToken, async (req, res) => {
    try {
        // we put the data structure of this model in {},
        // however, we just need all data of body of HTTP request, so don't need {}
        const recipe = new RecipeModel(req.body);
        const response = await recipe.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

// 3rd router func is 
// to save a recipe to user.savedRecipes
router.put("/savedRecipes", verifyToken, async (req, res) => {
    try {
        // so need to modify usersModel, add 
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err);
    }
});

// 4th router func is 
// to return all id for savedRecipe for userID
// modified when client side - call fetchSavedRecipes
    // instead of findById(req.body.userID) 
    // params:  capture dynamic parts of the URL. For example, in the route "/users/:id", if a request is made to "/users/123", the value "123" can be accessed using "req.params.id".
    // body: retrieve form data or JSON payloads
    // instead of get("/savedRecipes/ids",

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        // ? means () maybe null or undefined, preventing error
        res.json({ savedRecipes: user?.savedRecipes })
    } catch (err) {
        res.json(err);
    }
});

// 5th router func is
// to return all savedRecipe for userID
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        // grab the recipes where their id is inside of
        // user.savedRecipes(this is an array of recipesIDs)
        // $in:   is the syntax to match (recipeID in [array]user.savedRecipes )
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({ savedRecipes }); 
    } catch (err) {
        res.json(err);
    }
});
export { router as recipesRouter };