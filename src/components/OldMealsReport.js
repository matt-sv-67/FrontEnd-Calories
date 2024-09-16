//Matanel Shachamorov (206945446), Michal Berlin (206387391)
// src/components/OldMealsReport.js
// show the report from the day selected
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../App.css';
import EnhancedTable from './MUI_EnhancedTable';

const OldMealsReport = ({ selectedAttributes, deleteMeal }) => {
    // Show only if there is a report
    const [isReportVisible, setReportVisibility] = useState(true);

    if (selectedAttributes && selectedAttributes.length > 0 && isReportVisible) {
        // Get the first date of the selected report
        const firstSelectedDate = new Date(selectedAttributes[0].date);
        // Get the last date of the selected report
        const lastSelectedDate =
            new Date(selectedAttributes[selectedAttributes.length - 1].date);

        const firstDay = firstSelectedDate.getDate().toString().padStart(2, '0');
        const lastDay = lastSelectedDate.getDate().toString().padStart(2, '0');

        const firstMonth = (firstSelectedDate.getMonth() + 1).toString().padStart(2, '0');
        const lastMonth = (lastSelectedDate.getMonth() + 1).toString().padStart(2, '0');

        const firstYear = firstSelectedDate.getFullYear();
        const lastYear = lastSelectedDate.getFullYear();

        let formattedDate;

        // Setting 'formattedDate' based of the range of the selected date
        if (firstDay === lastDay && firstMonth === lastMonth && firstYear === lastYear) {
            formattedDate = `${firstDay}/${firstMonth}/${firstYear}`;// By day
        }
        else if (firstDay !== lastDay && firstMonth === lastMonth && firstYear === lastYear) {
            formattedDate = `${firstDay}-${lastDay}/${firstMonth}/${firstYear}`;// By month
        }
        else if (firstDay !== lastDay && firstMonth !== lastMonth && firstYear === lastYear) {
            formattedDate = `${firstDay}/${firstMonth}-${lastDay}/${lastMonth}/${firstYear}`;// By year
        }

        return (
            <div>
                <div className='app_meals_container_wrapper'>
                    <h1>Meals Report from: {formattedDate}</h1>
                </div>
                <div className='app_meals_container_wrapper' >
                    {/* Show a list of old reports in table */}
                    <EnhancedTable rows={selectedAttributes} deleteMeal={deleteMeal} />
                    <Button
                        className='btn'
                        variant='contained'
                        style={{ width: '20%' }}
                        onClick={() => setReportVisibility(false)}>
                        Hide report
                    </Button>{/* Button to hide the report from the page*/}
                </div>
            </div>
        );
    }
    return null;
};

export default OldMealsReport;