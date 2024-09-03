import React from 'react';

// Componente Button
const Button = ({ onClick, children, type = 'button', variant = 'primary', size = 'medium', disabled = false }) => {
    // Define las clases base para los botones
    const baseClasses = 'font-semibold text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2';

    // Define clases para los diferentes estilos de botones
    const variantClasses = {
        primary: 'bg-blue-500 hover:bg-blue-600',
        secondary: 'bg-gray-500 hover:bg-gray-600',
        success: 'bg-green-500 hover:bg-green-600',
        danger: 'bg-red-500 hover:bg-red-600',
    };

    // Define clases para los diferentes tamaños de botones
    const sizeClasses = {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };

    // Construye las clases finales del botón
    const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.medium} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

    return (
        <button 
            onClick={onClick} 
            type={type}
            className={classes}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
