import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import AddExercise from './AddExercise.js';
import Navbar from '../components/Navbar.jsx';
import ActivityList from './ActivityList.js';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const mdTheme = createTheme();

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [renderCount, setRenderCount] = React.useState(0);

  const handleClick = (value) => {
    setDate(value.$d);
  }
  return (
    <ThemeProvider theme={mdTheme}>
    <Navbar/>
    <Box
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    }}
  >
  <Grid spacing={4}  container>
<Grid xs={6} item>
  <Grid
    spacing={4}
    direction="column"
    container
    alignContent={'center'}
    alignItems='center'
  >
    <Grid item>
      <Box justifyContent={'center'} justifyItems='center' >
      {/*<Calendar onChange={handleClick} value={date} />*/}
      <Paper
    sx={{
      p: 2,
      width: 600,
    }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs='desktop'
        openTo="day"
        value={date}
        onChange={handleClick}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </Paper>
      </Box>
    </Grid>
    <Grid item>
    <Paper
    sx={{
      p: 2,
      width: 600,
    }}
    >
                      <AddExercise date={date.toDateString()} renderCount={renderCount} setRenderCount={setRenderCount}></AddExercise>

      </Paper>
    </Grid>
  </Grid>
</Grid>
<Grid xs={6} item>
  <Box>
  <Paper
    sx={{
      p: 2,
      width: 600,
    }}>
  <ActivityList date={date.toDateString()} renderCount={renderCount} setRenderCount={setRenderCount}></ActivityList>
  </Paper>
  </Box>
</Grid>
</Grid>
  </Box>

</ThemeProvider>

  );
}



export default Schedule;