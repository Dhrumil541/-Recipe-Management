// src/pages/RecipeCreate.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, db } from '../utils/firebase'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";

const RecipeCreate = () => {
    const [title, setTitle] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [image, setImage] = useState(null);
    
    const navigate = useNavigate();
    const [hasRecipes, setHasRecipes] = useState(false);

    useEffect(() => {
        const checkForRecipesCollection = async () => {
            try {
                const firestore = getFirestore();
                const recipesCollectionRef = collection(firestore, 'recipes');
                const recipesSnapshot = await getDocs(recipesCollectionRef);
                
                if (!recipesSnapshot.empty) {
                    setHasRecipes(true);
                } else {
                    setHasRecipes(false);
                }
            } catch (error) {
                console.error("Error fetching collection: ", error);
            }
        };

        checkForRecipesCollection();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (image) {
            const imageRef = ref(storage, `recipes/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);

            const newRecipe = {
                title,
                cuisine,
                ingredients,
                instructions,
                cookingTime: Number(cookingTime),
                image: imageUrl,
            };

            try {
                await addDoc(collection(db, 'recipes'), newRecipe);
                navigate('/Home');
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h1 className="text-4xl font-bold text-center text-gray-800">Create New Recipe</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Cuisine"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
                        required
                    />
                    <textarea
                        placeholder="Ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
                        required
                    />
                    <textarea
                        placeholder="Instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Cooking Time (in minutes)"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                        Create Recipe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecipeCreate;
