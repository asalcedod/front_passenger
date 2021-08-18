import React from 'react';
import './Input.css';

const Input = ({ attribute, handleChange, param }) => {
    return (
        <div className='input-container'>
            <input 
            id={attribute.id}
            name={attribute.name}
            placeholder={attribute.placeholder}
            type={attribute.type}
            onChange={ handleChange }
            className={ param ? 'input-error' : 'regular-style' }
            />
        </div>
    )
};

export default Input;