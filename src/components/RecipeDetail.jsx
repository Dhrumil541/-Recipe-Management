import React from 'react';

const RecipeDetail = ({ recipe, onDelete }) => {
    return (
        <div className="card">
            <h2 className="title">{recipe.title}</h2>
            <h3>Ingredients:</h3>
            <ul className="list-disc pl-5">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions:</h3>
            <p>{recipe.instructions}</p>
            <h3>Cooking Time:</h3>
            <p>{recipe.cookingTime} minutes</p>
            <button className="button" onClick={onDelete}>Delete Recipe</button>
        </div>
    );
};

export default RecipeDetail;
