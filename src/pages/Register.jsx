// src/pages/Register.jsx
import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { auth } from '../utils/firebase'; // Import Firebase auth
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the function

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Registered user:', userCredential.user);
            // You can store user details in local storage or in your database if needed
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 to-orange-500">
            <form className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-6" onSubmit={handleRegister}>
                <h2 className="text-3xl font-bold text-center text-gray-700">Register</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />
                <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300">
                    Register
                </Button>

                <p className="text-center text-gray-500">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Register;
