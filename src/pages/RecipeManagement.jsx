import React from 'react'
import { Link } from 'react-router-dom'

const RecipeManagement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Recipe Management</h1>

        <p className="text-gray-600 mb-8">Manage, create, and explore your favorite recipes all in one place!</p>

        <div className="space-x-4">
          <Link
            to="/Login"
            className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-yellow-600 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/Register"
            className="inline-block px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-teal-600 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeManagement
