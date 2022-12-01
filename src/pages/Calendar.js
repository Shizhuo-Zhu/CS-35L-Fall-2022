import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Calendar from 'react-calendar';
import { useState, useEffect} from 'react';
import { auth, db } from '../components/firebase.js'
import {collection, getDocs} from "firebase/firestore";
import AddExercise from './AddExercise.js';
import Navbar from '../components/Navbar.jsx';
import ActivityList from './ActivityList.js';
import { onAuthStateChanged } from 'firebase/auth';
import StaticDatePickerLandscape from '../components/StaticDatePickerLandscape';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const Schedule = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [date, setDate] = useState(new Date());
  //const [data, setData] = React.useState([]);

  const handleClick = (value) => {
    console.log(value.$d);
    //console.log(value.$d.toDateString());
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
      {/* <Calendar onChange={handleClick} value={date} /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={date}
        shouldDisableDate={isWeekend}
        onChange={handleClick}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
        {console.log(date.toDateString())}
      </Box>
    </Grid>
    <Grid item>
      <Paper >
      <AddExercise date={date.toDateString()}></AddExercise>

      </Paper>
    </Grid>
  </Grid>
</Grid>
<Grid xs={6} item>
  <Box>
  <ActivityList date={date.toDateString()}></ActivityList>
  </Box>
</Grid>
</Grid>
  </Box>

</ThemeProvider>

  );
}



export default Schedule;