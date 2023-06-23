import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    const userID = useGetUserID();
// manage side effects (affect outside world, 
// i.e. fetching data from an API, subscribing to events, or manipulating the DOM)
// 就是直接显示
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                // "response.data" get all the recipes
                setRecipes(response.data);
                // console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchSavedRecipe = async () => {
            try {
                // not "", `` and $
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
                //  with line below, in "inspect", we can 
                // console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecipe();
        // only in cases when logedin, we make request(call func fetchSavedRecipe). else, error occur
        if (cookies.access_token) fetchSavedRecipe();
    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put(
                "http://localhost:3001/recipes/savedRecipes", {
                    recipeID,
                    userID,
                }, 
                { headers: { authorization: cookies.access_token } }
            );
            setSavedRecipes(response.data.savedRecipes)
            // console.log(response);
        } catch (err) {
            console.error(err);
        }
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div>
            <h1> Recipes</h1>
            <ul>
                {recipes.map((recipe) =>(
                    <li key={recipe._id}>
                        {/* 条件，在for里面：for key满足条件，则显示xxx*/}
                        {savedRecipes.includes(recipe._id) && <h1>ALREADY SAVED</h1>}
                        <div>
                            <h2>{recipe.name}</h2>
                            <button 
                                onClick={() => saveRecipe(recipe._id)} 
                                disabled={isRecipeSaved(recipe._id)}
                            > 
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                            </button>
                        </div>
                        <div className="instructions">
                            <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name}/>
                        <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
                    </li>
                ))

                }

            </ul>
        </div>
    );
};