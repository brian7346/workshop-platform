/**
 * Solution for the Button component exercise
 */

import React from 'react';

function Button({ text, onClick, variant = 'primary', disabled = false }) {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.7 : 1
        };
      case 'secondary':
        return {
          backgroundColor: '#f1f1f1',
          color: '#333',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '8px 16px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.7 : 1
        };
      case 'danger':
        return {
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.7 : 1
        };
      default:
        return {};
    }
  };

  return (
    <button 
      style={getButtonStyle()} 
      onClick={onClick} 
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button; 