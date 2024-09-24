import React, { useState } from 'react';

const RecipeForm = ({ onSubmit, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [ingredients, setIngredients] = useState(initialData?.ingredients || ['']);
    const [instructions, setInstructions] = useState(initialData?.instructions || '');
    const [cuisineType, setCuisineType] = useState(initialData?.cuisineType || '');
    const [cookingTime, setCookingTime] = useState(initialData?.cookingTime || '');

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, ingredients, instructions, cuisineType, cookingTime });
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <h2 className="title">Add/Edit Recipe</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Recipe Title"
                className="input"
                required
            />
            <h3>Ingredients:</h3>
            {ingredients.map((ingredient, index) => (
                <input
                    key={index}
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="input"
                    placeholder={`Ingredient ${index + 1}`}
                    required
                />
            ))}
            <button type="button" onClick={handleAddIngredient} className="button mt-2">Add Ingredient</button>
            <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Instructions"
                className="input"
                required
            />
            <input
                type="text"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                placeholder="Cuisine Type"
                className="input"
                required
            />
            <input
                type="number"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                placeholder="Cooking Time (minutes)"
                className="input"
                required
            />
            <button type="submit" className="button">Save Recipe</button>
        </form>
    );
};

export default RecipeForm;
