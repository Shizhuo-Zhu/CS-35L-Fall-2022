import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc} from "firebase/firestore";
import { db, auth, getExercise, DeleteExercise} from '../components/firebase.js';
import { useEffect, useState } from 'react';
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import IconButton from '@mui/material/IconButton';
import { onAuthStateChanged } from 'firebase/auth';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 500,
  color: theme.palette.text.primary,
}));

const BlueAvatar = styled(Avatar)`
  background-color: #1976d2;
`;


const Test = (props) => {
    const activities = props.activities;
    const ids = props.ids;
    const date = props.date;
    const handleDelete = props.handleDelete;
    console.log(activities[0])
    let testArray = [];
    for (let i = 0; i < activities.length; i++) {
        if(activities[i]){
            testArray.push(
                    <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item>
                    <BlueAvatar><FitnessCenterIcon></FitnessCenterIcon></BlueAvatar>
                </Grid>
                <Grid item xs>
                    <h3>{activities[i].exercise.name}</h3>
                </Grid>
                <IconButton onClick={() => {handleDelete(date, ids[i])}}>
                    <DeleteTwoToneIcon></DeleteTwoToneIcon>
                </IconButton>
                </Grid>
            )
            for (let j = 0; j < activities[i].exercise.reps.length; j++) {
                testArray.push(
                    <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item>
                        <ArrowRightIcon fontSize="small"></ArrowRightIcon>
                    </Grid>
                    <Grid item xs>
                        <p><b>Set {j + 1}</b>: {activities[i].exercise.weights[j]} lbs for {activities[i].exercise.reps[j]} repetitions</p>
                        <p><u>Notes</u>: {activities[i].exercise.notes[j]}</p>
                    </Grid>
                   
                    </Grid>
                )
            }
        }
    }
    return(
        <div>
            {testArray}
        </div>
    );
}
const ActivityList = (props) => {
    const date = props.date;
    const [activities, setActivity] = useState([]);
    const [weight, setWeight] = useState('');
    //const activities = props.data;
    const [exerciseIDs, setIDs] = useState([]);
    const [rerender, setRerender] = useState(0);
    const [click, setClick] = useState(false);
    const handleDelete = (date, id) => {
        console.log(id);
        DeleteExercise(date, id);
        setClick(true);
    }
    useEffect(() => {
        let exercises = [];
        let ids = [];
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              const docs = await getDocs(collection(db, "users", user.uid, "dates", date, "exercises"));
              const docSnap = await getDoc(doc(db, "users", user.uid, "dates", date));
              //let bodyweight = docSnap.data().weight;
              //console.log(bodyweight);
              docs.forEach((doc) => {
                exercises.push(doc.data());
                ids.push(doc.id);
              });
              setActivity(exercises);
              //setWeight(bodyweight);
              //console.log(exercises);
              setIDs(ids)
              //setRerender(rerender + 1);
            }
          });
      }, [date, click]);
    return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        <StyledPaper
            sx={{
            my: 1,
            mx: 'auto',
            p: 2,
            }}
        >
            <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item><BlueAvatar size="small"><TodayTwoToneIcon></TodayTwoToneIcon></BlueAvatar></Grid>
            <Grid item xs><h2>{date}</h2></Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item><BlueAvatar size="small"><MonitorWeightIcon></MonitorWeightIcon></BlueAvatar></Grid>
            <Grid item xs><h3>{weight} lbs</h3></Grid>
            </Grid>
            <Test activities={activities} ids={exerciseIDs} date={date} handleDelete={handleDelete}></Test>
        </StyledPaper>
    </Box>
    );
}

export default ActivityList