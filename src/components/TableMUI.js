//Matanel Shachamorov (206945446), Michal Berlin (206387391)
// src/components/TableMUI.js
// The table that displaying the meals' description, type and calories for today and for old report
import React from 'react';
// Material-UI imports and styling:
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

// Function to get set the order when sorting the columns
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// Function that gets the comparator based on the order and orderBy
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// unction to stabilize sorting order
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// Define the columns and by the meals attributes (description, type and calories)
const headCells = [
    {
        id: 'des',
        numeric: true,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Calories',
    },
    {
        id: 'type',
        numeric: true,
        disablePadding: false,
        label: 'Type',
    },
]

// Component for the table header
function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } =
        props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding='checkbox'>
                    <Checkbox
                        color='primary'
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all meals',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='center'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// Prop types for EnhancedTableHead component
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

// Component for the toolbar above the table
function EnhancedTableToolbar(props) {
    const { numSelected, deleteMeal, selected, setSelected } = props;

    // Function to delete selected meals
    const deleteMealFromTable = () => {
        selected.forEach((item) => {
            deleteMeal(item);
        });
        setSelected([]);
    }


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color='inherit'
                    variant='subtitle1'
                    component='div'
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant='h6'
                    id='tableTitle'
                    component='div'
                >
                </Typography>
            )}

            {numSelected > 0 && (
                <Tooltip title='Delete'>
                    <IconButton onClick={deleteMealFromTable}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}


// Prop types for EnhancedTableToolbar component
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
//   ! -----------------------------------------!
// Main EnhancedTable component
function EnhancedTable(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    let { rows } = props;

    // Reverse the order of the rows so it will show last meal at the top of the table
    const rowsR = React.useMemo(() => {
        return [...rows].reverse();
    }, [rows]);

    // Event handler for sorting
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Event handler for selecting all rows
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rowsR.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    // Event handler for individual row selection
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    // Event handler for changing page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Event handler for changing rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Function to determine if a row is selected
    const isSelected = (id) => {
        const index = selected.indexOf(id);

        return index !== -1;
    };

// Calculate the number of empty rows
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // Visible rows based on sorting, page, and rows per page
    const visibleRows = React.useMemo(
        () =>
            stableSort(rowsR, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, rowsR] // Include rows in the dependency array
    );

    // Return the JSX for the EnhancedTable component
    return (
        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
            <Paper sx={{ width: '80%', mb: 2 }}>
                {/* Conditionally render the delete row only if items are selected */}
                {selected.length > 0 && (
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        selected={selected}
                        setSelected={setSelected}
                        deleteMeal={props.deleteMeal}
                        sx={{ mb: 1 }} // Minimize the space between the delete row and the table
                    />
                )}
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby='tableTitle'
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role='checkbox'
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding='checkbox'>
                                            <Checkbox
                                                color='primary'
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            padding='normal'
                                            component='th'
                                            id={labelId}
                                            scope='row'
                                            align='center'
                                        >
                                            {row.description} {/* Set each meal in a row */}
                                        </TableCell>
                                        <TableCell align='center'>{row.calorie}</TableCell>
                                        <TableCell align='center'>{row.category}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>

    );
}

export default EnhancedTable;