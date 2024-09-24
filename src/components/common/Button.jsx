import React from 'react';

const Button = ({ children, type, className }) => {
    return (
        <button
            type={type}
            className={`bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
