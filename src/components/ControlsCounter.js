//Matanel Shachamorov (206945446), Michal Berlin (206387391)
// src/components/ControlsCounter.js
//display total calories of today
import React from 'react';
import '../App.css';

const ControlsCounter = ({ totalCalories }) => {
    return (
        <div className='app_controls_counter'>
            <h2>Total calories for today: <span>{totalCalories}</span></h2>{/*show total calories of today*/}
            {/*show image to design the page*/}
            <img src={'/images/food_image.png'}
                 alt='food_image'
                 style={{ width: '70%', height: 'auto' }}
            />
        </div>
    );
};

export default ControlsCounter;