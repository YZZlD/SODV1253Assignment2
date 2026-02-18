import { useState } from 'react'
import './App.css'
import data from './data/data.json';
import detailedData from'./data/detailedData.json'
import RecipeCard from './components/RecipeCard';

function App() {
  //State for recipes and diet.
  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState("");
  const[recipeDetails, addRecipeDetails] = useState({});

  //Fetch from the spoonacular API with the ingredients list and dietary restrictions then set the recipes in state.
  async function FetchRecipes() {
    const queryString = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${getIngredients()}${getDiet() == "" ? "" : `&diet=${getDiet()}`}&number=100&apiKey=${import.meta.env.VITE_API_KEY}`;
    const response = await fetch(queryString);
    const recipes = await response.json();
    setRecipes(recipes.results);
    //Testing without API calls
    // setRecipes(data.results)
  }

  //Grab recipe detail from spoonacular API by id then add it to the recipeDetails object
  const FetchRecipeDetails = async (id) =>{
    const queryString = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`;
    const response = await fetch(queryString);
    const detailedRecipe = await response.json();
    addRecipeDetails({...recipeDetails, [id]: detailedRecipe});
    //Testing without API calls
    // addRecipeDetails({...recipeDetails, [id]: detailedData})
  }

  //Helper function which checks which of the diet radio inputs are checked and grabs the value from it to determine the diet
  function getDiet() {
    return document.querySelector('input[name="diet"]:checked').value;
  }

  //Grabs ingredients from the search bar value
  function getIngredients() {
    return document.getElementById("searchBar").value;
  }

  return (
    <>
      <div>
        <form>
          <input type="search" id="searchBar" placeholder='ingredient1,ingredient2,ingredient3...'></input>
          {/* Radio button for dietary selection. Checked status is handled through a diet state variable, which is modified when the radio menu is clicked. */}
          <fieldset>
            <input type="radio" id="None" name="diet" value="" checked={"" == diet} onChange={() => setDiet("")}></input>
            <label htmlFor="None">No Dietary Restrictions</label>

            <input type="radio" id="Vegetarian" name="diet" value="vegetarian" checked={"vegetarian" == diet} onChange={() => setDiet("vegetarian")}></input>
            <label htmlFor="Vegetarian">Vegetarian</label>

            <input type="radio" id="Gluten-Free" name="diet" value="gluten-free" checked={"gluten-free" == diet} onChange={() => setDiet("gluten-free")}></input>
            <label htmlFor="Gluten-Free">Gluten Free</label>

            <input type="radio" id="Vegan" name="diet" value="vegan" checked={"vegan" == diet} onChange={() => setDiet("vegan")}></input>
            <label htmlFor="Vegan">Vegan</label>
          </fieldset>
          <button type="button" onClick={FetchRecipes}>Search</button>
        </form>

        {/* Dynamically generate a grid of recipes returned from the API for a given query string. */}
        <div className='gridContainer'>
          {recipes.map((recipe) => {
            console.log(recipe.id);
            if(recipeDetails[recipe.id]) return <RecipeCard key={recipeDetails[recipe.id].id} recipeId={recipeDetails[recipe.id].id} title={recipeDetails[recipe.id].title} image={recipeDetails[recipe.id].image} readyInMinutes={recipeDetails[recipe.id].readyInMinutes} instructions={recipeDetails[recipe.id].analyzedInstructions} ingredients={recipeDetails[recipe.id].extendedIngredients} fetchRecipeDetails={FetchRecipeDetails}></RecipeCard>;
            else return <RecipeCard key={recipe.id} recipeId={recipe.id} title={recipe.title} image={recipe.image} ingredients={[]} instructions={[]} fetchRecipeDetails={FetchRecipeDetails}></RecipeCard>;
          })}
        </div>
      </div>
    </>
  )
}

export default App
