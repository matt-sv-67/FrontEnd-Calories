
// Matanel Shachamorov (206945446), Michal Berlin (206387391)
//src/App.js

import React, { useState, useEffect } from 'react';
import idb from './idb';
import 'react-calendar/dist/Calendar.css';
import Button from '@mui/material/Button';

import CalendarShow from './components/CalendarShow';
import OldMealsReport from './components/OldMealsReport';
import Navbar from './components/Navbar';
import ShowMealsOfToday from './components/ShowMealsOfToday';
import fetchAttributesForDate from './components/DataService';
import ErrorHandling from './components/ErrorClass';
import ControlsCounter from './components/ControlsCounter';
import ControlsInput from './components/ControlsInput';
import './App.css';

const App = () => {
  const [meals, setMeals] = useState([]);
  const [calories, setMealCalories] = useState(0);
  const [mealType, setMealType] = useState(null);
  const [mealDescripton, setMealDescripton] = useState('');
  const [totalCalories, setTotalCalories] = useState(0);
  const [showMealsReport, setShowMealsReport] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState(null);

  const fetchMeals = async () => {
    try {
      console.log("Fetching meals for today...");
      await idb.openCaloriesDB('caloriesdb', 1);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const mealsToday = await fetchAttributesForDate(today, setSelectedAttributes, 'today');
      console.log("Meals fetched for today:", mealsToday);

      if (mealsToday && mealsToday.length > 0) {
        const sumCalories = mealsToday.reduce((total, meal) =>
            total + (parseInt(meal.calorie, 10) || 0), 0);
        setMeals(mealsToday);
        setTotalCalories(sumCalories);
      } else {
        console.log("No meals recorded for today.");
        setMeals([]);
        setTotalCalories(0);
      }
    } catch (error) {
      console.error("Error fetching meals for today:", error);
      throw new ErrorHandling('fetch');
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const onAddMealsClick = async () => {
    if (calories <= 0) {
      alert('Must fill a legal calories larger than zero, not negative or text');
      return;
    }
    if (mealType === null) {
      alert('Must pick a meal to register');
      return;
    }
    if (mealDescripton === '') {
      alert('Must provide meal description');
      return;
    }
    try {
      await idb.openCaloriesDB('caloriesdb', 1);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const formattedDate = today.toISOString().split('T')[0];

      await idb.addCalories({
        calorie: calories,
        category: mealType,
        description: mealDescripton,
        date: formattedDate,
      });
      await fetchMeals();
      alert('Meal added successfully!');
    } catch (error) {
      console.error(error);
      throw ErrorHandling('addMeal');
    }
    setMealCalories(0);
    setMealDescripton('');
    setMealType('');
  };

  const deleteMeal = async (mealId) => {
    try {
      await idb.openCaloriesDB('caloriesdb', 1);
      await idb.deleteCalorie(mealId);
      setShowMealsReport(false);
      await fetchMeals();
    } catch (error) {
      console.error(error);
      throw ErrorHandling('delete');
    }
  };

  const clickToShowCalendar = () => {
    const calendarContainer = document.getElementsByClassName('calendar-container')[0];
    if (calendarContainer) {
      if (calendarContainer.style.display === 'none') {
        calendarContainer.style.display = 'block';
        setShowMealsReport(false);
      } else {
        calendarContainer.style.display = 'none';
      };
    };
  };

  return (
      <div className='App_home'>
        <Navbar />
        <table className='app_table'>
          <tbody>
          <tr>
            <td className='app_table_cell'>
              <ControlsCounter totalCalories={totalCalories} />
            </td>
            <td className='app_table_cell'>
              <ControlsInput
                  calories={calories}
                  mealDescripton={mealDescripton}
                  mealType={mealType}
                  setMealCalories={setMealCalories}
                  setMealDescripton={setMealDescripton}
                  setMealType={setMealType}
                  onAddMealsClick={onAddMealsClick}
              />
            </td>
            <td className='app_table_cell'>
              <div className='app_constrols_report'>
                <Button className='btn' onClick={clickToShowCalendar} variant='contained'
                        color='primary' sx={{ marginTop: '10px', marginBottom: '10px' }}>
                  Old reports:
                </Button>
                <CalendarShow
                    setShowMealsReport={setShowMealsReport}
                    setSelectedAttributes={setSelectedAttributes}
                />
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <ShowMealsOfToday meals={meals} deleteMeal={deleteMeal} />
        {showMealsReport ? (
            <OldMealsReport
                selectedAttributes={selectedAttributes}
                deleteMeal={deleteMeal}
            />
        ) : null}
      </div>
  );
};
export default App;
