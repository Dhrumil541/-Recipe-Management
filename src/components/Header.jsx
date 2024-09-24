import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 shadow-lg">
            <div className="flex justify-between items-center">
                <div className="text-white text-3xl font-extrabold">
                    <span className="text-yellow-300">Recipe</span> Management
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/Home" className="text-white text-lg hover:underline hover:text-yellow-300 transition duration-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/recipes" className="text-white text-lg hover:underline hover:text-yellow-300 transition duration-200">Recipes</Link>
                        </li>
                        <li>
                            <Link to="/login" className="text-white text-lg hover:underline hover:text-yellow-300 transition duration-200">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="text-white text-lg hover:underline hover:text-yellow-300 transition duration-200">Register</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="mt-4 text-center">
                <p className="text-white text-sm">Your one-stop solution for managing all your delicious recipes!</p>
            </div>
        </header>
    );
};

export default Header;
