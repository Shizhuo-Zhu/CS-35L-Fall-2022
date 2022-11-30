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
import {db, addExercise} from '../components/firebase.js'
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

  function SetFeatures(props) {
    const unit = props.weightUnit;
    const newExercise = props.newExercise;
    const [weight, setWeight] = React.useState('');
    const [reps, setReps] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const [confirmed, setConfirmed] = React.useState(false);
    const handleWeightChange = event => {
        const result = event.target.value.replace(/\D/g, '');
        setWeight(result);
    };
    const handleRepsChange = event => {
        const result = event.target.value.replace(/\D/g, '');
        setReps(result);
    };
    const handleNotesChange = event => {
      const result = event.target.value;
      setNotes(result);
  };
    const handleConfirm = () => {
      newExercise.weights.push(weight);
      newExercise.reps.push(reps);
      newExercise.notes.push(notes);
      setConfirmed(true);
    }
    return (
    <div className="flex">
        <FormControl sx={{ m: 1, width: '11ch' }} variant="outlined">
          <OutlinedInput
            id="weight"
            type="text"
            value= {weight}
            onChange={handleWeightChange}
            endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
            inputProps={{
              'aria-label': 'weight',
              maxLength: 4,
            }}
            required
          />
          <FormHelperText id="weight">Weight</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: '5.5ch' }} variant="outlined">
          <OutlinedInput
            id="reps"
            value= {reps}
            onChange={handleRepsChange}
            inputProps={{
              'aria-label': 'reps',
              maxLength: 2
            }}
            required
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
  const [sets, setSets] = React.useState(1);
  const [unit, setUnit] = React.useState('lbs');
  //const exerciseCollectionRef = collection(db, "exercise");
  const newExercise = {date, name, sets, unit, reps:[], weights:[], notes:[]}
  const createExercise = async () => {
    await addExercise(date, newExercise);
    window.location.reload();
  }
  let displaySetFeatures = [];
  for (let i = 0; i < sets; i++) {
      displaySetFeatures.push(<SetFeatures key={i} weightUnit={unit} newExercise={newExercise}/>)
  }
  return (
    <div>
        <FormControl sx = {{m: 1, width: '30ch'}}>
        <TextField id="name"
                   label="Name"
                   variant="outlined"
                   onChange={(e) => setName(e.target.value)}
                   inputProps={{
                       maxLength: 30
                   }}
                   required
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
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel id="unit">Unit</InputLabel>
       <Select
          labelId="unit"
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <MenuItem value={'lbs'}>lbs</MenuItem>
          <MenuItem value={'kg'}>kg</MenuItem>
        </Select>
      </FormControl>
      {displaySetFeatures}
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={createExercise}>Add Exercise</Button>
      </Stack>
      </div>
  );
}


export default function AddExercise(props) {
  const date = props.date;
    return (
        <div>
            <AddNewExercise date={date}/>
        </div>
    )
}