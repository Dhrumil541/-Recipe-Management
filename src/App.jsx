// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeCreate from './pages/RecipeCreate';
import RecipeManagement from './pages/RecipeManagement';
import "./App.css"
import Layout from './components/Layout/Layout';

const App = () => {
    const [recipes, setRecipes] = useState([
        { id: 1, title: 'Dhosa', cuisine: 'Italian', ingredients: 'Pasta, Eggs, Parmesan', instructions: 'Boil pasta, mix with ingredients', cookingTime: 20 },
        { id: 2, title: 'Pasta', cuisine: 'Japanese', ingredients: 'Rice, Fish', instructions: 'Prepare rice and fish, roll together', cookingTime: 40 },
        { id: 3, title: 'Pav Bhaji', cuisine: 'Mexican', ingredients: 'Tortilla, Meat, Cheese', instructions: 'Cook meat, assemble tacos', cookingTime: 15 },
        { id: 4, title: 'Butter paper', cuisine: 'Indian', ingredients: 'Chicken, Butter, Spices', instructions: 'Cook chicken with spices and butter', cookingTime: 60 },
    ]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<RecipeManagement />} />
                <Route path='/' element={<Layout />}>
                    <Route  path='/Home' element={<Home recipes={recipes} />} />
                    <Route path="/recipes" element={<Recipes recipes={recipes} />} />
                    <Route path="/recipes/:id" element={<RecipeDetail recipes={recipes} setRecipes={setRecipes} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/recipes/create" element={<RecipeCreate recipes={recipes} setRecipes={setRecipes} />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
