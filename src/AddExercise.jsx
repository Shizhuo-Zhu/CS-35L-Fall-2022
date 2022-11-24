import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';


const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));

  function SetFeatures() {
    return (
    <div>
        <FormControl sx={{ m: 1, width: 100}} variant="filled">
            <InputLabel htmlFor="weight">Weight</InputLabel>
            <BootstrapInput id="weight" />
        </FormControl>
        <FormControl sx={{ m: 1 , width: 75}} variant="filled">
            <InputLabel htmlFor="reps">Reps</InputLabel>
            <BootstrapInput id="reps" />
        </FormControl>
        <FormControl sx={{ m: 1 , width: 300}} variant="filled">
            <InputLabel htmlFor="notes">Notes</InputLabel>
            <BootstrapInput id="notes" />
        </FormControl>
    </div>
    );
}

function AddNewExercise() {
  const [sets, setSets] = React.useState(1);
  const handleChange = (event) => {
    setSets(event.target.value);
  };
  let displaySetFeatures = [];
  for (let i = 0; i < sets; i++) {
      displaySetFeatures.push(<SetFeatures key={i}/>)
  }
  return (
    <div>
      <FormControl sx={{ m: 1 }} variant="filled">
        <InputLabel htmlFor="name">Name</InputLabel>
        <BootstrapInput id="name" />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="filled">
        <InputLabel id="sets">Sets</InputLabel>
       <Select
          labelId="sets"
          id="sets"
          value={sets}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      {displaySetFeatures}
    </div>
  );
}




export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  const [Workout, setWorkout] = React.useState('');

  const handleChange = (event) => {
    setWorkout(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Add New</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>
          <Box component="form" sx={{ width: 1 }}>
            <AddNewExercise/>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Log</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}