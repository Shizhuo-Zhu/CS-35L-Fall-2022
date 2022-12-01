import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import {db, addExercise, addBodyweight} from '../components/firebase.js'
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";

  function SetFeatures(props) {
    // const unit = props.weightUnit;
    const newExercise = props.newExercise;
    const [weight, setWeight] = React.useState('');
    const [reps, setReps] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const [confirmed, setConfirmed] = React.useState(false);
    const handleWeightChange = event => {
        if (confirmed) return;
        const result = event.target.value.replace(/[^\d\.]/g, '');
        setWeight(result);
    };
    const handleRepsChange = event => {
      if (confirmed) return;
        const result = event.target.value.replace(/\D/g, '');
        setReps(result);
    };
    const handleNotesChange = event => {
      if (confirmed) return;
      const result = event.target.value;
      setNotes(result);
  };
    const handleConfirm = () => {
      if (weight == '' || reps == '') return;
      newExercise.weights.push(weight);
      newExercise.reps.push(reps);
      newExercise.notes.push(notes);
      setConfirmed(true);
    }
    return (
    <div className="flex">
        <FormControl sx={{ m: 1, width: '13.5ch' }} variant="outlined">
          <OutlinedInput
            id="weight"
            type="text"
            value= {weight}
            onChange={handleWeightChange}
            endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
            inputProps={{
              'aria-label': 'weight',
              maxLength: 5,
            }}
            required
          />
          <FormHelperText id="weight">Weight</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: '6ch' }} variant="outlined">
          <OutlinedInput
            id="reps"
            value= {reps}
            onChange={handleRepsChange}
            inputProps={{
              'aria-label': 'reps',
              maxLength: 2
            }}
            required="true"
          />
          <FormHelperText id="reps">Reps.</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
          <OutlinedInput
            id="notes"
            value= {notes}
            onChange={handleNotesChange}
            inputProps={{
              'aria-label': 'notes',
              maxLength: 50
            }}
          />
          <FormHelperText id="notes">Notes</FormHelperText>
        </FormControl>
        {confirmed ? <CheckCircleTwoToneIcon color='primary' sx={{fontSize: 35}}/> : <Button variant="outlined" onClick={handleConfirm}>Confirm</Button>}
    </div>
    );
}

function AddNewExercise(props) {
  const date = props.date;
  const [name, setName] = React.useState('');
  const [sets, setSets] = React.useState(0);
  const newExercise = {date, name, sets, reps:[], weights:[], notes:[]}
  const createExercise = async () => {
    if (name == '') return;
    await addExercise(date, newExercise);
    setName('');
    setSets(0);
  }
  let displaySetFeatures = [];
  for (let i = 0; i < sets; i++) {
      displaySetFeatures.push(<SetFeatures key={i} newExercise={newExercise}/>)
  }
  return (
    <div>
        <FormControl sx = {{m: 1, width: '30ch'}}>
        <TextField id="name"
                   label="Exercise Name"
                   variant="outlined"
                   onChange={(e) => setName(e.target.value)}
                   inputProps={{
                       maxLength: 30
                   }}
                   required
                   value={name}
                />
        </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel id="sets">Sets</InputLabel>
       <Select
          labelId="sets"
          id="sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        >
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
        </Select>
      </FormControl>
      {displaySetFeatures}
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={createExercise}>Add Exercise</Button>
      </Stack>
      </div>
  );
}

function LogBodyweight(props) {
  const date = props.date
  const [bodyweight, setBodyweight] = React.useState('');
  const handleBodyweightChange = event => {
    const result = event.target.value.replace(/[^\d\.]/g, '');
    setBodyweight(result);
  };

  const createBodyweight = async () => {
    if (bodyweight == '') return
    await addBodyweight(date, bodyweight);
    setBodyweight('')
  };
  
  return (
    <div>
  <FormControl sx={{ m: 1, width: '11.5ch' }} variant="outlined">
  <OutlinedInput
    id="bodyweight"
    type="text"
    value= {bodyweight}
    onChange={handleBodyweightChange}
    endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
    inputProps={{
      'aria-label': 'weight',
      maxLength: 5,
    }}
    required
  />
  <FormHelperText id="bodyweight">Bodyweight</FormHelperText>
  </FormControl>
  <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={createBodyweight}>Log</Button>
      </Stack>
</div>
  )
}

export default function AddExercise(props) {
  const date = props.date;
    return (
        <div>
            <LogBodyweight date={date}/>
            <AddNewExercise date={date}/>
        </div>
    )
}