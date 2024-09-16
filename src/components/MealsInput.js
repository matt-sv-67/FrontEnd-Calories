//Matanel Shachamorov (206945446), Michal Berlin (206387391)
// src/components/MealsInput.js
// Controls for adding new meals
import React from 'react';
//Material-UI imports and styling:
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material';
import '../App.css';

const MealsInput = ({
                           calories,
                           mealDescripton,
                           mealType,
                           setMealCalories,
                           setMealDescripton,
                           setMealType,
                           onAddMealsClick,
                       }) => {
    return (
        <div className='app_constrols_Input_muster'>
            <div className='app_constrols_Input'>
                <h1>Add new meal for today:</h1>
                {/*adding meal description */}
                <FormControl fullWidth sx={{ marginTop: '20px' }} >
                    <InputLabel htmlFor='meal-des'>Enter meal description...</InputLabel>
                    <Input sx={{ textAlign: 'center' }}
                           type='text'
                           placeholder='Enter meal description...'
                           value={mealDescripton}
                           onChange={(e) => setMealDescripton(e.target.value)}></Input>
                </FormControl>
                {/*adding meal calories */}
                <TextField type='number' label='Calories' inputProps={{ min: 0 }}
                           value={calories} onChange={(e) => setMealCalories(e.target.value)}
                           fullWidth margin='normal' />
                {/*adding meal type */}
                <FormControl fullWidth sx={{ marginTop: '5px',marginBottom: '5px', marginLeft: 0 }}>
                    <InputLabel id='meal-type-placeholder' htmlFor='meal-name'>
                        Select meal type
                    </InputLabel>
                    <Select
                        labelId='meal-type-placeholder'
                        value={mealType || ''}
                        onChange={(e) => setMealType(e.target.value)}
                        label='Select meal type'
                        fullWidth
                    >
                        <MenuItem value='BREAKFAST'>BREAKFAST</MenuItem>
                        <MenuItem value='LUNCH'>LUNCH</MenuItem>
                        <MenuItem value='DINNER'>DINNER</MenuItem>
                        <MenuItem value='OTHER'>OTHER</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {/*adding meal to the database and display it in the list*/}
            <Button
                className='btn'
                onClick={onAddMealsClick}
                variant='contained'
                color='primary'
                >
                Add Meal
            </Button>
        </div>
    );
};

export default MealsInput;