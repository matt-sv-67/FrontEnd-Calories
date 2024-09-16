//Matanel Shachamorov (206945446), Michal Berlin (206387391)
// src/components/Navbar.js
// display settings for the page
import React from 'react';
import '../App.css';

// The header bar at the top of the page
const Navbar = () => {
    return (
        <div className='app_navbar'>
            <h1>My <span>Calorie</span> Calculator</h1>
            <img src={'/images/newicon.png'}
                 alt='icon'
                 style={{width: '10%', height: 'auto'}}
            />
        </div>
    );
};

export default Navbar;