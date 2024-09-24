// src/pages/RecipeDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storage } from '../utils/firebase'; // Import your Firebase configuration
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage methods

const RecipeDetail = ({ recipes, setRecipes }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const recipe = recipes.find(r => r.id === parseInt(id));

    const [isEditing, setIsEditing] = useState(false);
    const [editedRecipe, setEditedRecipe] = useState({ ...recipe });
    const [image, setImage] = useState(recipe.image || '');

    // Load image URL from local storage if available
    useEffect(() => {
        const storedImageUrl = localStorage.getItem(`recipe-${id}-image`);
        if (storedImageUrl) {
            setImage(storedImageUrl);
            setEditedRecipe(prev => ({ ...prev, image: storedImageUrl }));
        }
    }, [id]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedRecipe({
            ...editedRecipe,
            [name]: value,
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`);
            try {
                // Upload image to Firebase Storage
                await uploadBytes(storageRef, file);
                // Get the download URL
                const downloadURL = await getDownloadURL(storageRef);
                setImage(downloadURL); // Set the image URL
                setEditedRecipe(prev => ({ ...prev, image: downloadURL }));
                // Store the URL in local storage
                localStorage.setItem(`recipe-${id}-image`, downloadURL);
            } catch (error) {
                console.error("Error uploading file: ", error);
            }
        }
    };

    const handleUpdateRecipe = () => {
        const updatedRecipes = recipes.map(r =>
            r.id === recipe.id ? { ...editedRecipe, image } : r
        );
        setRecipes(updatedRecipes);
        setIsEditing(false);
    };

    const handleDeleteRecipe = () => {
        const filteredRecipes = recipes.filter(r => r.id !== recipe.id);
        setRecipes(filteredRecipes);
        localStorage.removeItem(`recipe-${id}-image`); // Remove image URL from local storage on delete
        navigate('/recipes');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Recipe Details</h1>

            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="title"
                        value={editedRecipe.title}
                        onChange={handleEditChange}
                        className="p-2 border mb-4 w-full"
                    />
                    <input
                        type="text"
                        name="ingredients"
                        value={editedRecipe.ingredients}
                        onChange={handleEditChange}
                        className="p-2 border mb-4 w-full"
                    />
                    <textarea
                        name="instructions"
                        value={editedRecipe.instructions}
                        onChange={handleEditChange}
                        className="p-2 border mb-4 w-full"
                    />
                    <input
                        type="number"
                        name="cookingTime"
                        value={editedRecipe.cookingTime}
                        onChange={handleEditChange}
                        className="p-2 border mb-4 w-full"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-4"
                    />
                    {image && (
                        <img
                            src={image}
                            alt="Recipe"
                            className="w-32 h-32 object-cover rounded-full mb-4"
                        />
                    )}
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleUpdateRecipe}
                    >
                        Update
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl">{recipe.title}</h2>
                    {recipe.image && (
                        <img
                            src={recipe.image}
                            alt="Recipe"
                            className="w-32 h-32 object-cover rounded-full mb-4"
                        />
                    )}
                    <p>Ingredients: {recipe.ingredients}</p>
                    <p>Instructions: {recipe.instructions}</p>
                    <p>Cooking Time: {recipe.cookingTime} minutes</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit    
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
                        onClick={handleDeleteRecipe}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecipeDetail;
