//Matanel Shachamorov (206945446), Michal Berlin (206387391)
// components/ShowMealsOfToday.js
//show a list of meals added today

import React from 'react';
import '../App.css';
import EnhancedTable from './MUI_EnhancedTable';

const ShowMealsOfToday = ({ meals, deleteMeal }) => {
    return (
        <div>
            <div className='app_meals_container_wrapper'>
                <h1>Your meals today:</h1>
            </div>
            {/* display the meals */}
            <EnhancedTable rows = {meals} deleteMeal={deleteMeal}/>
        </div>
    );
};

export default ShowMealsOfToday;