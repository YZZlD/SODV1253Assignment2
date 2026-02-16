import '../css/recipeCard.css';

export default function RecipeCard(props) {
    return (
        <>
            <div className="recipeCard">
                <img className="recipeImage" src={props.image} alt={props.title}></img>
                <div className="recipeTitle">{props.title}</div>
            </div>
        </>
    )
}
