// src/pages/Recipes.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Recipes = ({ recipes }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Recipes</h1>
            <ul className="space-y-2">
                {recipes.map(recipe => (
                    <li key={recipe.id} className="p-4 border rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition duration-200">
                        <Link to={`/recipes/${recipe.id}`} className="text-2xl font-semibold text-white">{recipe.title}</Link>
                        <p className="text-gray-200">Cuisine: {recipe.cuisine}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recipes;
