import React from 'react';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className="logo">
            <img src={brain} alt="logo" />
        </div>
    )
}

export default Logo;
