import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes] = useState([
        { id: 1, title: 'Dhosa', cuisine: 'Italian', ingredients: 'Pasta, Eggs, Cheese', instructions: 'Boil pasta, cook eggs, mix together', cookingTime: '20 minutes' },
        { id: 2, title: 'Pasta', cuisine: 'Japanese', ingredients: 'Rice, Fish, Seaweed', instructions: 'Cook rice, roll with fish and seaweed', cookingTime: '40 minutes' },
        { id: 3, title: 'Pav Bhaji', cuisine: 'Mexican', ingredients: 'Tortilla, Meat, Vegetables', instructions: 'Cook meat, prepare vegetables, assemble taco', cookingTime: '15 minutes' },
        { id: 4, title: 'Butter paper', cuisine: 'Indian', ingredients: 'Chicken, Butter, Spices', instructions: 'Cook chicken in butter with spices', cookingTime: '30 minutes' },
    ]);

    // Filter recipes based on search term
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Recipe Listing</h1>
            <input
                type="text"
                placeholder="Search by title..."
                className="p-2 border border-gray-300 rounded mb-4 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Show all recipes when no search term, otherwise show filtered results */}
            {filteredRecipes.length > 0 ? (
                <ul className="space-y-2">
                    {filteredRecipes.map(recipe => (
                       <li
                       key={recipe.id}
                       className="p-6 border-2 border-transparent rounded-lg bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 shadow-lg hover:shadow-2xl hover:from-purple-500 hover:via-blue-400 hover:to-green-400 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                   >
                       <Link
                           to={`/recipes/${recipe.id}`}
                           className="text-2xl font-bold text-white hover:underline hover:text-gray-100"
                       >
                           {recipe.title}
                       </Link>
                       <p className="text-gray-200 mt-2">Cuisine: {recipe.cuisine}</p>
                   </li>
                   
                    ))}
                </ul>
            ) : (
                <p>No recipes found!</p>
            )}
        </div>
    );
};

export default RecipeListing;
