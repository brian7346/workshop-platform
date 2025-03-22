/**
 * Solution for the Counter state exercise
 */

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    // Prevent the count from going below 0
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const reset = () => {
    setCount(0);
  };

  const counterStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    maxWidth: '300px',
    margin: '0 auto'
  };

  const countDisplay = {
    fontSize: '2rem',
    margin: '10px 0',
    color: count === 0 ? '#666' : count > 5 ? '#27ae60' : '#3498db'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  };

  const buttonStyle = {
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none'
  };

  return (
    <div style={counterStyle}>
      <h2>Counter</h2>
      <div style={countDisplay}>{count}</div>
      <div style={buttonContainerStyle}>
        <button 
          style={{
            ...buttonStyle,
            backgroundColor: '#3498db',
            color: 'white'
          }} 
          onClick={increment}
        >
          Increment
        </button>
        <button 
          style={{
            ...buttonStyle,
            backgroundColor: '#e74c3c',
            color: 'white',
            opacity: count === 0 ? 0.5 : 1,
            cursor: count === 0 ? 'not-allowed' : 'pointer'
          }} 
          onClick={decrement}
          disabled={count === 0}
        >
          Decrement
        </button>
        <button 
          style={{
            ...buttonStyle,
            backgroundColor: '#f1f1f1',
            color: '#333',
            opacity: count === 0 ? 0.5 : 1,
            cursor: count === 0 ? 'not-allowed' : 'pointer'
          }} 
          onClick={reset}
          disabled={count === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter; 