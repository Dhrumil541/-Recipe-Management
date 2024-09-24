import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ recipes }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter recipes based on the search term
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h1 className="text-4xl font-bold text-center text-gray-800">Welcome to Recipe Management!</h1>
                <p className="text-center text-gray-600">Your one-stop solution for managing all your delicious recipes!</p>
            </div>

            {/* Search bar */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="p-2 border border-gray-300 rounded mb-4 w-full focus:outline-none focus:border-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Recipe Listing */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Recipe Listing</h2>
                <ul className="space-y-2">
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map(recipe => (
                            <li key={recipe.id} className="p-4 border rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition duration-200">
                                <h3 className="text-2xl font-semibold text-white">{recipe.title}</h3>
                                <p className="text-gray-200">Cuisine: {recipe.cuisine}</p>
                                <div className="flex items-center justify-center">
                                    {recipe.image && (
                                        <img 
                                            src={typeof recipe.image === 'string' ? recipe.image : URL.createObjectURL(recipe.image)} 
                                            alt={recipe.title} 
                                            className="my-2 object-cover rounded-full bg-transparent recipe-img"
                                        />
                                    )}
                                </div>
                                <Link to={`/recipes/${recipe.id}`} className="text-blue-200 hover:underline">View Details</Link>
                            </li>
                        ))
                    ) : (
                        <li className="p-4 text-center text-gray-500">No recipes found.</li>
                    )}
                </ul>
                <div className="mt-6">
                    <Link to="/recipes/create" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                        Create New Recipe
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
