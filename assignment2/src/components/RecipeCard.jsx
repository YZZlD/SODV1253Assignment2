import '../css/recipeCard.css';

export default function RecipeCard(props) {
    return (
        //Display props information in recipe card.
        <>
            <details className="recipeCard" onClick={() => props.fetchRecipeDetails(props.recipeId)}>
                <summary>
                    <div>
                        <img className="recipeImage" src={props.image} alt={props.title}></img>
                        <div className="recipeTitle">{props.title}</div>
                    </div>
                </summary>
                <h3>Ready in ⏱ {props.readyInMinutes} minutes</h3>

                {/* Loop over ingredients prop and display all ingredients */}
                <ul>
                    {props.ingredients.map((ingredient) => {
                        return <li>{ingredient.original}</li>
                    })}
                </ul>

                {/* Loop over instruction prop and display steps */}
                <ol>
                    {props.instructions.map((instruction) => {
                        return instruction.steps.map((step) => {
                            return <li>{step.step}</li>
                        })
                    })}
                </ol>
            </details>
        </>
    )
}
