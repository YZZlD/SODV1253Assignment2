import { useState } from 'react'
import './App.css'
import data from './data/data.json';
import RecipeCard from './components/RecipeCard';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState("");

  async function FetchRecipes() {
    //const queryString = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${getIngredients()}${getDiet() == "" ? "" : `&diet=${getDiet()}`}&apiKey=${import.meta.env.VITE_API_KEY}`;
    const response = await fetch(queryString);
    const recipes = await response.json();
    setRecipes(recipes.results);
  }

  function getDiet() {
    return document.querySelector('input[name="diet"]:checked').value;
  }

  function getIngredients() {
    return document.getElementById("searchBar").value;
  }

  return (
    <>
    <div>
      <form>
        <input type="search" id="searchBar" placeholder='ingredient1,ingredient2,ingredient3...'></input>
        <fieldset>
          <input type="radio" id="None" name="diet" value="" checked={"" == diet} onChange={() => setDiet("")}></input>
          <label htmlFor="None">No Dietary Restrictions</label>

          <input type="radio" id="Vegetarian" name="diet" value="vegetarian" checked={"vegetarian" == diet} onChange={() => setDiet("vegetarian")}></input>
          <label htmlFor="Vegetarian">Vegetarian</label>

          <input type="radio" id="Vegan" name="diet" value="vegan" checked={"vegan" == diet} onChange={() => setDiet("vegan")}></input>
          <label htmlFor="Vegan">Vegan</label>
        </fieldset>
        <button type="button" onClick={FetchRecipes}>Search</button>
      </form>

    <div className='gridContainer'>
      {recipes.map((recipe) => {
        return <RecipeCard title={recipe.title} image={recipe.image}></RecipeCard>
      })}
    </div>

    </div>

    </>
  )
}

export default App
