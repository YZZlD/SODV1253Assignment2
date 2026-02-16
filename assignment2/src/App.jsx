import { useState } from 'react'
import './App.css'
import data from './data/data.json';
import RecipeCard from './components/RecipeCard';

function App() {
  const [recipes, setRecipes] = useState([]);

  function FetchRecipes() {
    setRecipes(data);
    console.log(recipes);
  }

  return (
    <>
    <div>
      <form>
        <input type="search" id="searchBar"></input>
        <button type="button" onClick={FetchRecipes}>Search</button>
      </form>

      {recipes.map((recipe) => {
        return <RecipeCard title={recipe.title} image={recipe.image}></RecipeCard>
      })}
    </div>

    </>
  )
}

export default App
