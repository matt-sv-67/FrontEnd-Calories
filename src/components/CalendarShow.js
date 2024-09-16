//Matanel Shachamorov (206945446), Michal Berlin (206387391)
// src/components/CalendarShow.js
// calendar to get a report of specific date
import React, { useState } from 'react';
import '../App.css';
import fetchAttributesForDate from './DataService';
import ErrorHandling from './ErrorClass';
//Import from MUI
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// React Date Picker calendar formatted as 'DD/MM/YYYY'
const ByDayCalendar = ({ selectedDate, setSelectedDate }) => {
    return (
        <DatePicker
            className='cal-style'
            showIcon
            maxDate={new Date()}
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
        />
    );
};

// React Date Picker calendar formatted as 'MM/YYYY'
const ByMonthCalendar = ({ selectedDate, setSelectedDate }) => {
    return (
        <DatePicker
            className='cal-style'
            showIcon
            maxDate={new Date()}
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat='MM/yyyy'
            excludeDates={[
                1661990400000, 1664582400000, 1667260800000, 1672531200000,
            ]}
            showMonthYearPicker
        />
    );
};

// React Date Picker calendar formatted as 'YYYY'
const ByYearCalendar = ({ selectedDate, setSelectedDate }) => {
    return (
        <DatePicker
            className='cal-style'
            showIcon
            maxDate={new Date()}
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showYearPicker
            dateFormat='yyyy'
        />
    );
};


const CalendarShow = ({ setShowMealsReport, setSelectedAttributes }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    // Set selectedaView as the chosen calendar
    const [selectedView, setSelectedView] = useState('');

    const selectDate = async () => {
        try {
            // Fetch meals for the selected date based on the selectedView
            await fetchAttributesForDate(selectedDate, setSelectedAttributes, selectedView);
            setShowMealsReport(true);
            // Hide the calendar after selecting a date
            document.getElementsByClassName('calendar-container')[0].style.display = 'none';
        } catch (error) {
            console.error('Error fetching attributes:', error);
            throw ErrorHandling('fetch');
        }
    };
    return (
        <div className='calendar-container' style={{ display: 'none' }}>
            <p>Choose how to get an old calories report:</p>
            <FormControl component='fieldset'>
                {/* Radio buttons to choose the preferred calendar*/}
                <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    value={selectedView}
                    onChange={(event) => setSelectedView(event.target.value)}
                >
                    <FormControlLabel
                        value='byDay'
                        control={<Radio name='cal' />}
                        label='By Day'
                    />

                    <FormControlLabel
                        value='byMonth'
                        control={<Radio name='cal' />}
                        label='By Month'
                    />
                    <FormControlLabel
                        value='byYear'
                        control={<Radio name='cal' />}
                        label='By Year'
                    />
                </RadioGroup>
            </FormControl>
            {/* Show the calendar by the user preference */}
            <div className='cal-container'
                 style={{ display: selectedView === 'byDay' ? 'block' : 'none' }}>
                <ByDayCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>

            <div className='cal-container'
                 style={{ display: selectedView === 'byMonth' ? 'block' : 'none' }}>
                <ByMonthCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>

            <div className='cal-container'
                 style={{ display: selectedView === 'byYear' ? 'block' : 'none' }}>
                <ByYearCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            <Button className='btn'
                    onClick={selectDate}
                    variant='contained'
                    sx={{ marginTop: '20px' }}>
                Download report
            </Button>
        </div>
    );
};

export default CalendarShow;