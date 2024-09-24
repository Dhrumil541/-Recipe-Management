// src/pages/Login.jsx
import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { auth } from '../utils/firebase'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the function
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in user:', userCredential.user);
            navigate("/Home");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
            <form className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-4" onSubmit={handleLogin}>
                <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                
                <Button type="submit" className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200 w-full">
                    Login
                </Button>
                
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account? <a href="/register" className="text-purple-500 hover:underline">Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
