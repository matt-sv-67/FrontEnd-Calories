//Matanel Shachamorov (206945446), Michal Berlin (206387391)
// src/components/DataService.js
import idb from '../idb';
import ErrorHandling from './ErrorClass';

// Fetching the meals based on the date
const fetchAttributesForDate = async (selectedDate, setSelectedAttributes, selectedView) => {
    try {
        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth() + 1;
        const selectedDay = selectedDate.getDate();
        const attributes = await idb.getAllCalories();

        let filteredAttributes;

        if (selectedView) { // Filter the meals based on the calendar view
            switch (selectedView) {
                case 'today':
                case 'byDay':
                    filteredAttributes = attributes.filter((item) => {
                        const itemDate = new Date(item.date);
                        const itemYear = itemDate.getFullYear();
                        const itemMonth = itemDate.getMonth() + 1;
                        const itemDay = itemDate.getDate();
                        return selectedYear === itemYear &&
                            selectedMonth === itemMonth &&
                            selectedDay === itemDay;

                    });
                    break;
                case 'byMonth':
                    filteredAttributes = attributes.filter((item) => {
                        const itemDate = new Date(item.date);
                        const itemYear = itemDate.getFullYear();
                        const itemMonth = itemDate.getMonth() + 1;
                        return selectedYear === itemYear &&
                            selectedMonth === itemMonth;
                    });
                    break;
                case 'byYear':
                    filteredAttributes = attributes.filter((item) => {
                        const itemDate = new Date(item.date);
                        const itemYear = itemDate.getFullYear();
                        return selectedYear === itemYear;
                    });
                    break;
                default:
                    break;
            }

            // Checking if there are meals from that date

            if ((!filteredAttributes || filteredAttributes.length === 0) &&
                selectedView !== 'today') {
                alert('No calories from that time');
                setSelectedAttributes(null);
                return [];
            } else {
                setSelectedAttributes(filteredAttributes);
                return filteredAttributes;
            }
        }

    } catch (error) {
        console.error('Error fetching attributes for date:', error);
        throw ErrorHandling('fetch');
    }
};

export default fetchAttributesForDate;