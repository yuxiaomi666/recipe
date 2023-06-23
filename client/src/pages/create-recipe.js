import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";

// most important one in front-end create recipe
export const CreateRecipe = () => {
    const userID = useGetUserID();
    // when call setRecipe, will update recipe state 
    const [cookies, _] = useCookies(["access_token"]);
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate();

    // handle change in form inputs
    const handleChange = (event) => {
        // event.target denotes the trigger of event, in this case: input below
        // value denotes the new value in input
        const { name, value } = event.target;
            // const { name: var1, value: var2 } = event.target;
            // const var1 = event.target.name;
        // call setRecipe, format { ...recipe, name: value}
        // new a recipe(... means same property)
        // [name]: value  assign value specified by name. 
        // without [], will assign value to the field "name"
        setRecipe({ ...recipe, [name]: value });
    };

    const handleIngredientChange = (event, idx) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({ ...recipe, ingredients: ingredients });
    };

    // S1: include all current ingredients and then add a empty string
    const addIngredient = (event) => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe, { 
                headers: { authorization: cookies.access_token } });
            alert("Recipe created");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="create-recipe">
            <h2> Create Recipe</h2>
            <form onSubmit={onSubmit}>
                {/* form to send data */}
                {/* every input has a name attribute because in onChange we use "name" to match */}
                <label htmlFor="name"> Name </label>
                <input type="text" id="name" name="name" onChange={handleChange} />
                <label htmlFor="ingredients"> Ingredients </label>
                {/* map == for each */}
                {recipe.ingredients.map((ingredient, idx) => (
                    <input 
                        key={idx} 
                        type="text" 
                        name="ingredients" 
                        value={ingredient} 
                        onChange={ (event) => handleIngredientChange(event, idx)} 
                    />
                ))}
                {/* default will be "submit button", meaning once click, the button will disappear*/}
                <button onClick={addIngredient} type="button"> Add Ingredient </button>
                <label htmlFor="instructions"> Instructions </label>
                <textarea id="name" name="instructions" onChange={handleChange} ></textarea>
                <label htmlFor="imageUrl"> Image URL </label>
                <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
                <label htmlFor="cookingTime"> Cooking Time (minutes) </label>
                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />
                <button type="submit"> Create Recipe</button>

            </form>
        </div>
    );
};